export default async function handler(req, res) {
  if (req.query.secret !== process.env.CONTENTSTACK_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const entryUrl = req.body.data.entry.url;
    await res.unstable_revalidate(entryUrl);
    return res.json({ message: `Generated build for ${entryUrl}` });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
