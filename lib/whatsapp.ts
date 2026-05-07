/**
 * WhatsApp utility functions
 * Main business number: 231555109860
 * NextGents partner number: 250791389824 (only used for footer branding link)
 */

const WHATSAPP_NUMBER = '231555109860'
const NEXTGENTS_NUMBER = '250791389824'

/**
 * Generate WhatsApp order message URL
 * @param productName - Name of the product
 * @param price - Price of the product
 * @returns WhatsApp URL with pre-filled message
 */
export function getWhatsAppOrderUrl(productName: string, price: string): string {
  const message = encodeURIComponent(
    `Hi Sura, I want to order ${productName} at $${price}`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
}

/**
 * Get main WhatsApp contact URL
 * @returns WhatsApp URL for general inquiries
 */
export function getWhatsAppContactUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}`
}

/**
 * Get NextGents partner WhatsApp URL
 * Only used for footer branding link
 * @returns WhatsApp URL for NextGents
 */
export function getNextGentsUrl(): string {
  return `https://wa.me/${NEXTGENTS_NUMBER}`
}

/**
 * Get the main WhatsApp number
 * @returns WhatsApp number string
 */
export function getWhatsAppNumber(): string {
  return WHATSAPP_NUMBER
}

/**
 * Get the NextGents WhatsApp number
 * @returns NextGents WhatsApp number string
 */
export function getNextGentsNumber(): string {
  return NEXTGENTS_NUMBER
}
