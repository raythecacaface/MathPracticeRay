/**
 * Resolves a playable/unblocked destination URL from tracking pixel or sync frame URLs.
 * Bypasses tracking wrappers (like DoubleClick, Criteo, etc.) and extracts the underlying destination game portal.
 */
export function resolvePlayableUrl(url) {
  if (!url) return '';
  
  // Clean potential entity-encoded ampersands
  let cleanedUrl = url.trim().replace(/&amp;/g, '&');
  
  try {
    const urlObj = new URL(cleanedUrl);
    
    // Check for DoubleClick partner pixels
    if (urlObj.hostname.includes('doubleclick.net')) {
      const embeddedUrl = urlObj.searchParams.get('url');
      if (embeddedUrl) {
        return resolvePlayableUrl(decodeURIComponent(embeddedUrl));
      }
    }
    
    // Check for Criteo sync frames
    if (urlObj.hostname.includes('criteo.com')) {
      const topUrl = urlObj.searchParams.get('topUrl');
      if (topUrl) {
        let decoded = decodeURIComponent(topUrl);
        if (!decoded.startsWith('http://') && !decoded.startsWith('https://')) {
          decoded = 'https://' + decoded;
        }
        return resolvePlayableUrl(decoded);
      }
    }
    
    // Handle standard URL redirection parameters from other tracking/match frames
    const trackingParams = ['url', 'topUrl', 'redirect', 'destination', 'dest', 'target', 'link', 'origin', 'to'];
    for (const param of trackingParams) {
      const val = urlObj.searchParams.get(param);
      if (val && (val.startsWith('http') || val.includes('.'))) {
        let decoded = decodeURIComponent(val);
        if (!decoded.startsWith('http://') && !decoded.startsWith('https://')) {
          decoded = 'https://' + decoded;
        }
        if (decoded !== cleanedUrl) {
          return resolvePlayableUrl(decoded);
        }
      }
    }
  } catch (e) {
    // Fail silently, return original if not standard URL
  }
  
  return cleanedUrl;
}
