const csv = require("csv-parser");
const { createReadStream } = require("fs");
const { createObjectCsvWriter } = require("csv-writer");
const Jimp = require("jimp");

const inputFilePath = "input_images.csv";
const outputFilePath = "compressed_images.csv";

const csvWriter = createObjectCsvWriter({
  path: outputFilePath,
  header: [
    { id: "id", title: "id" },
    { id: "image", title: "image" },
  ],
});

const processData = () => {
  const records = [];

  createReadStream(inputFilePath)
    .pipe(csv())
    .on("data", (row) => records.push(row))
    .on("end", async () => {
      const processedRecords = [];

      for (const record of records) {
        const imageBuffer = Buffer.from(record.image, "base64");
        // Check if the buffer is not empty -> if empty, will just skip the record
        if (!imageBuffer.length) {
          console.error(`Error: Empty buffer for ID ${record.id}`);
          continue;
        }
        try {
          const image = await Jimp.read(imageBuffer).catch((err) => {
            console.error(`Error processing image for ID ${record.id}:`, err);
            return null; // Return null if error encountered
          });

          // If Jimp.read was successful
          if (image) {
            await image.quality(75); // Adjust quality factor as needed
            // can also add resizing, and/or set greyscale
            const compressedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
            const compressedBase64 = compressedBuffer.toString("base64");
            processedRecords.push({
              id: record.id,
              image: compressedBase64,
            });
          } else {
            console.error(`Unsupported or corrupted image for ID ${record.id}`);
          }
        } catch (error) {
          console.error(`Error processing image for ID ${record.id}:`, error);
        }
      }

      csvWriter
        .writeRecords(processedRecords)
        .then(() =>
          console.log(
            "The CSV file: compressed_images.csv was written successfully"
          )
        );
    });
};

processData();
