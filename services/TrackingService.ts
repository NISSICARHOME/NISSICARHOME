/**
 * Tracking Service for Nissi Car Home
 * Handles conversion events for Meta, Google, and TikTok.
 * Optimized for Conversion API (CAPI) and Server-Side tracking.
 */

type EventParams = Record<string, any>;

// Helper to generate a unique event ID for deduplication between Pixel and CAPI
const generateEventId = () => `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const TrackingService = {
  /**
   * Track a generic event across all platforms
   */
  trackEvent(eventName: string, params: EventParams = {}) {
    const eventId = generateEventId();
    const enrichedParams = { ...params, event_id: eventId };

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, enrichedParams);
    }

    // TikTok Pixel
    if (typeof window !== 'undefined' && (window as any).ttq && typeof (window as any).ttq.track === 'function') {
      (window as any).ttq.track(eventName, enrichedParams);
    }

    // Google Tag Manager / GA4
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        event_id: eventId,
        ...params
      });
    }

    // Placeholder for Server-Side Conversion API (CAPI)
    // In a real production environment, this would call a backend endpoint
    // that forwards the event to Meta/TikTok/Google servers.
    this.sendToCAPI(eventName, enrichedParams);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Tracking] Event: ${eventName}`, enrichedParams);
    }
  },

  /**
   * Mock function for Server-Side Conversion API
   */
  async sendToCAPI(eventName: string, params: EventParams) {
    try {
      // Example: await fetch('/api/tracking/capi', { method: 'POST', body: JSON.stringify({ eventName, params }) });
    } catch (e) {
      // Silent fail for tracking
    }
  },

  /**
   * Track when a user views a product
   */
  trackViewContent(product: { id: string; name: string; price: number }) {
    this.trackEvent('ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'COP'
    });
  },

  /**
   * Track when a user adds an item to the cart
   */
  trackAddToCart(item: { id: string; name: string; price: number; quantity: number }) {
    this.trackEvent('AddToCart', {
      content_ids: [item.id],
      content_name: item.name,
      content_type: 'product',
      value: item.price * item.quantity,
      currency: 'COP'
    });
  },

  /**
   * Track when a user initiates a purchase
   */
  trackInitiateCheckout(item: { id: string; name: string; price: number }) {
    this.trackEvent('InitiateCheckout', {
      content_ids: [item.id],
      content_name: item.name,
      content_type: 'product',
      value: item.price,
      currency: 'COP'
    });
  },

  /**
   * Track successful purchase
   */
  trackPurchase(order: { id: string; total: number; items: any[] }) {
    this.trackEvent('Purchase', {
      content_ids: order.items.map(i => i.id),
      value: order.total,
      currency: 'COP',
      num_items: order.items.length,
      transaction_id: order.id
    });
  },

  /**
   * Track when a user contacts via WhatsApp (Lead)
   */
  trackLead(source: string) {
    this.trackEvent('Lead', {
      content_category: 'WhatsApp',
      content_name: source
    });
  },

  /**
   * Track page views
   */
  trackPageView(url: string) {
    this.trackEvent('PageView', { url });
  }
};
