// pages/api/ss.js
export default async function handler(req, res) {
  // Assuming you're receiving the URL to screenshot as a query parameter
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  const accessKey = "Id53MuBcmnqVNA"; // Your ScreenshotOne access key
  const screenshotUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(url)}&access_key=${accessKey}`;

  try {
    const screenshotResponse = await fetch(screenshotUrl);
    if (!screenshotResponse.ok) {
      // If the external API call fails, relay that failure back to the client
      throw new Error("Failed to fetch screenshot");
    }

    // Stream the image data directly from ScreenshotOne to the client
    const imageData = await screenshotResponse.arrayBuffer();
    res.setHeader("Content-Type", "image/jpeg"); // Adjust according to the actual content type
    res.send(Buffer.from(imageData));
  } catch (error) {
    console.error("Error fetching screenshot:", error);
    res.status(500).json({ error: "Failed to fetch screenshot" });
  }
}
