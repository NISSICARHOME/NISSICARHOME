/**
 * Tracking Service for Nissi Car Home
 * Handles conversion events for Meta, Google, and TikTok.
 */

type EventParams = Record<string, any>;

export const TrackingService = {
  /**
   * Track a generic event across all platforms
   */
  trackEvent(eventName: string, params: EventParams = {}) {
    const timestamp = new Date().toISOString();
    const eventId = `event_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, {
        ...params,
        event_id: eventId
      });
    }

    // TikTok Pixel
    if (typeof window !== 'undefined' && (window as any).ttq && typeof (window as any).ttq.track === 'function') {
      (window as any).ttq.track(eventName, {
        ...params,
        event_id: eventId
      });
    }

    // Google Tag Manager / GA4
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        event_id: eventId,
        timestamp,
        ...params
      });
    }

    // Server-Side Conversion API (CAPI) Placeholder
    // In a real production environment, this would call a backend endpoint
    // that proxies the event to Meta/Google/TikTok servers.
    this.sendToServerSideCAPI(eventName, { ...params, event_id: eventId, timestamp });

    console.log(`[Tracking] Event: ${eventName}`, params);
  },

  /**
   * Mock for Server-Side Conversion API
   */
  async sendToServerSideCAPI(eventName: string, payload: any) {
    try {
      // Example: fetch('/api/tracking/capi', { method: 'POST', body: JSON.stringify({ eventName, payload }) });
      // This helps bypass ad-blockers and improves tracking accuracy.
    } catch (e) {
      console.error('CAPI Error:', e);
    }
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
      currency: 'COP',
      num_items: item.quantity
    });
  },

  /**
   * Track when a user initiates a purchase (e.g., clicks "Buy Now")
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
   * Track a successful purchase
   */
  trackPurchase(order: { id: string; value: number; items: any[] }) {
    this.trackEvent('Purchase', {
      transaction_id: order.id,
      value: order.value,
      currency: 'COP',
      content_ids: order.items.map(i => i.id),
      content_type: 'product',
      num_items: order.items.length
    });
  },

  /**
   * Track when a user contacts via WhatsApp (Lead)
   */
  trackLead(source: string) {
    this.trackEvent('Lead', {
      content_category: 'WhatsApp',
      content_name: source,
      value: 0,
      currency: 'COP'
    });
  },

  /**
   * Track page views
   */
  trackPageView(url: string) {
    this.trackEvent('PageView', { url });
  }
};
