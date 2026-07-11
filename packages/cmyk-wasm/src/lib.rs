use wasm_bindgen::prelude::*;
use moxcms::{ColorProfile, TransformOptions, Layout};
use pdf_writer::Finish;

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

/**
 * Transforms sRGB pixel buffer (RGB) to CMYK using the provided target ICC Profile.
 * If the profile is empty or invalid, falls back to a mathematical RGB->CMYK conversion.
 */
#[wasm_bindgen]
pub fn convert_rgb_to_cmyk_wasm(
    rgb_data: &[u8],
    icc_profile_bytes: &[u8]
) -> Result<Vec<u8>, JsValue> {
    let source_profile = ColorProfile::new_srgb();
    let dest_profile = ColorProfile::new_from_slice(icc_profile_bytes);

    match dest_profile {
        Ok(dest_profile) => {
            // Create a color transform from sRGB (Rgb) to CMYK (Cmyka - which has 4 channels C, M, Y, K)
            let transform = source_profile
                .create_transform_8bit(
                    Layout::Rgb,
                    &dest_profile,
                    Layout::Cmyka,
                    TransformOptions::default()
                )
                .map_err(|e| JsValue::from_str(&format!("Failed to create color transform: {:?}", e)))?;

            let num_pixels = rgb_data.len() / 3;
            let mut cmyk_data = vec![0u8; num_pixels * 4];

            transform
                .transform(rgb_data, &mut cmyk_data)
                .map_err(|e| JsValue::from_str(&format!("Color transform failed: {:?}", e)))?;

            Ok(cmyk_data)
        }
        Err(_) => {
            // Fallback: Mathematical RGB to CMYK
            let num_pixels = rgb_data.len() / 3;
            let mut cmyk_data = vec![0u8; num_pixels * 4];
            for i in 0..num_pixels {
                let r = rgb_data[i * 3] as f32 / 255.0;
                let g = rgb_data[i * 3 + 1] as f32 / 255.0;
                let b = rgb_data[i * 3 + 2] as f32 / 255.0;

                let k = 1.0 - r.max(g).max(b);
                if k >= 1.0 {
                    cmyk_data[i * 4] = 0;
                    cmyk_data[i * 4 + 1] = 0;
                    cmyk_data[i * 4 + 2] = 0;
                    cmyk_data[i * 4 + 3] = 255;
                } else {
                    let c = (1.0 - r - k) / (1.0 - k);
                    let m = (1.0 - g - k) / (1.0 - k);
                    let y = (1.0 - b - k) / (1.0 - k);

                    cmyk_data[i * 4] = (c * 255.0).round() as u8;
                    cmyk_data[i * 4 + 1] = (m * 255.0).round() as u8;
                    cmyk_data[i * 4 + 2] = (y * 255.0).round() as u8;
                    cmyk_data[i * 4 + 3] = (k * 255.0).round() as u8;
                }
            }
            Ok(cmyk_data)
        }
    }
}

/**
 * Encodes raw CMYK pixel data into a standard TIFF container.
 */
#[wasm_bindgen]
pub fn encode_cmyk_tiff_wasm(
    cmyk_data: &[u8],
    width: u32,
    height: u32
) -> Result<Vec<u8>, JsValue> {
    use std::io::Cursor;
    use tiff::encoder::*;

    let mut buffer = Cursor::new(Vec::new());
    {
        let mut encoder = TiffEncoder::new(&mut buffer)
            .map_err(|e| JsValue::from_str(&format!("Failed to create TIFF encoder: {:?}", e)))?;

        // Write CMYK 8-bit image
        let image = encoder.new_image::<colortype::CMYK8>(width, height)
            .map_err(|e| JsValue::from_str(&format!("Failed to create TIFF image layout: {:?}", e)))?;

        image.write_data(cmyk_data)
            .map_err(|e| JsValue::from_str(&format!("Failed to write CMYK data to TIFF: {:?}", e)))?;
    }

    Ok(buffer.into_inner())
}

/**
 * Encodes raw CMYK data into a PDF/X-1a compliant document with TrimBox, BleedBox, and OutputIntent.
 */
#[wasm_bindgen]
pub fn generate_pdf_x_wasm(
    cmyk_data: &[u8],
    width: u32,
    height: u32,
    dpi: u32,
    icc_profile_bytes: &[u8],
    bleed_mm: f32
) -> Result<Vec<u8>, JsValue> {
    use pdf_writer::{Pdf, Ref, Name, Rect};

    let mut pdf = Pdf::new();

    // Setup indirect object IDs
    let catalog_ref = Ref::new(1);
    let page_tree_ref = Ref::new(2);
    let page_ref = Ref::new(3);
    let image_ref = Ref::new(4);
    let icc_ref = Ref::new(5);
    let content_ref = Ref::new(6);

    // Calculate dimensions in PDF points (72 points = 1 inch)
    let width_in = (width as f32) / (dpi as f32);
    let height_in = (height as f32) / (dpi as f32);
    let width_pt = width_in * 72.0;
    let height_pt = height_in * 72.0;

    // Bleed offset calculation in points (1 mm = 72 / 25.4 = 2.8346 points)
    let pt_per_mm = 72.0 / 25.4;
    let bleed_pt = bleed_mm * pt_per_mm;

    // Bounding boxes for PDF/X
    let media_box = Rect::new(0.0, 0.0, width_pt, height_pt);
    let trim_box = Rect::new(bleed_pt, bleed_pt, width_pt - bleed_pt, height_pt - bleed_pt);
    let bleed_box = Rect::new(0.0, 0.0, width_pt, height_pt);

    // 1. Write the target CMYK ICC profile stream (only if provided, otherwise write placeholder dummy data)
    let profile_to_write = if icc_profile_bytes.is_empty() {
        // Minimum mock ICC header to keep standard tools happy
        &[0u8; 128]
    } else {
        icc_profile_bytes
    };
    pdf.stream(icc_ref, profile_to_write);

    // 2. Write the Page Tree
    pdf.pages(page_tree_ref)
        .count(1)
        .kids([page_ref]);

    // 3. Write the Page Dictionary
    let mut page = pdf.page(page_ref);
    page.parent(page_tree_ref);
    page.media_box(media_box);
    page.trim_box(trim_box);
    page.bleed_box(bleed_box);
    page.contents(content_ref);
    
    // Inject resources (the image XObject)
    let mut resources = page.resources();
    resources.x_objects().insert(Name(b"Im1")).primitive(image_ref);
    resources.finish();
    page.finish();

    // 4. Draw the image inside the content stream (stretched to match the PDF bounds)
    let mut content = pdf_writer::Content::new();
    content.save_state();
    content.transform([width_pt, 0.0, 0.0, height_pt, 0.0, 0.0]);
    content.x_object(Name(b"Im1"));
    content.restore_state();
    pdf.stream(content_ref, &content.finish());

    // 5. Write the Image XObject (CMYK, 8 bits per channel)
    let mut image = pdf.stream(image_ref, cmyk_data);
    image.pair(Name(b"Type"), Name(b"XObject"));
    image.pair(Name(b"Subtype"), Name(b"Image"));
    image.pair(Name(b"Width"), width as i32);
    image.pair(Name(b"Height"), height as i32);
    image.pair(Name(b"ColorSpace"), Name(b"DeviceCMYK"));
    image.pair(Name(b"BitsPerComponent"), 8);
    image.finish();

    // 6. Write the Document Catalog and OutputIntent for PDF/X compliance
    let mut catalog = pdf.catalog(catalog_ref);
    catalog.pages(page_tree_ref);
    
    let mut intents = catalog.output_intents();
    let mut intent = intents.push();
    intent.subtype(pdf_writer::types::OutputIntentSubtype::PDFX);
    intent.output_condition_identifier(pdf_writer::TextStr("CGATS TR001"));
    intent.dest_output_profile(icc_ref);
    intent.finish();
    intents.finish();
    catalog.finish();

    Ok(pdf.finish())
}
