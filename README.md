# Image Compressor Tool

## Task Overview

This tool aims to process a collection of base64-encoded images provided in a CSV file, compress each image by adjusting its JPEG quality, and save the compressed images alongside their IDs back to a new CSV file.

## Solution

The solution involves the following steps:

1. **Reading CSV Input**: The input `input_images.csv` contains two columns: `id` for image identification and `image` for the base64-encoded image data.
2. **Decoding Base64**: Each base64-encoded string is decoded to retrieve the actual image data.
3. **Image Compression**: The image is compressed by adjusting its JPEG quality.
   - The JPEG quality factor used in this tool is configurable but set to 75 by default, providing a balance between image quality and compression.
4. **Encoding to Base64**: The compressed image is re-encoded to a base64 string.
5. **Writing CSV Output**: The ID and compressed base64-encoded image data are saved to `compressed_images.csv`.

## How to Run the Code

1. **Install Node.js**: Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Clone or Download This Repository**: Obtain the project files to your local machine.

3. **Install Dependencies**: Navigate to the project directory in your terminal and run:

   ```bash
   npm install csv-parser csv-writer jimp fs
   ```

   or simply

   ```bash
   npm install
   ```

4. **Prepare Your CSV Input**: Place your input CSV file named `input_images.csv` in the project directory. Ensure it follows the format with `id` and `image` columns.

5. **Run the Script**: Execute the Node.js script with the command:

   ```bash
   node index.js
   ```

   or

   ```bash
   npm start
   ```

6. **Check the Output**: Upon completion, the script will generate a file named `compressed_images.csv` in the project directory, containing the IDs and the compressed image data.

## Dependencies

This project relies on the following NPM packages:

- `csv-parser`: For reading the input CSV file.
- `csv-writer`: For writing the output CSV file.
- `jimp`: For image processing, including decoding, compressing, and encoding images.

## Limitations

- The current implementation primarily focuses on compressing images by converting them to JPEG and adjusting the JPEG quality factor. This approach introduces lossy compression and does not apply to non-JPEG images in the same way.
- For different image formats, such as PNG, different techniques (such as color depth reduction, metadata removal, or encoding optimization) might be applied to achieve compression. However, these techniques are not implemented in the current solution.

## Notes

- Adjustments to the JPEG quality factor can be made within the script to balance between compression and quality as required for your specific needs.
