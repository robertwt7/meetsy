window.dataLayer = window.dataLayer || [];

declare global {
  interface Window {
    // TODO: replace this with a more specific type based on usage
    dataLayer: any[];
  }
}
