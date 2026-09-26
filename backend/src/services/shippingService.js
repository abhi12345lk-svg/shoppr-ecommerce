/**
 * Indian Shipping & Logistics Aggregation Architecture
 * Provides a modular shipping layer for Indian courier networks (Shiprocket, Delhivery, Shadowfax, BlueDart)
 */

export class ShippingService {
  /**
   * Validate Indian Pincode & Calculate Serviceability + Estimated Delivery
   * @param {string} pincode 
   * @returns {Object} serviceability info
   */
  static checkPincodeServiceability(pincode) {
    const cleanPin = String(pincode || "").trim();

    // Indian PIN codes must be 6 digits and cannot start with 0
    const isValidPattern = /^[1-9][0-9]{5}$/.test(cleanPin);

    if (!isValidPattern) {
      return {
        serviceable: false,
        pincode: cleanPin,
        message: "Please enter a valid 6-digit Indian pincode"
      };
    }

    const firstDigit = cleanPin[0];
    let zoneName = "North India";
    let cityHub = "Delhi NCR Hub";
    let estimatedDays = 3;

    switch (firstDigit) {
      case "1":
      case "2":
        zoneName = "North India (Delhi, Haryana, Punjab, UP, HP, JK)";
        cityHub = "Gurugram Fulfillment Center";
        estimatedDays = 2;
        break;
      case "3":
      case "4":
        zoneName = "West India (Maharashtra, Gujarat, Rajasthan, MP)";
        cityHub = "Bhiwandi / Mumbai Logistics Hub";
        estimatedDays = 3;
        break;
      case "5":
      case "6":
        zoneName = "South India (Karnataka, TN, Kerala, AP, Telangana)";
        cityHub = "Bengaluru Airport Hub";
        estimatedDays = 3;
        break;
      case "7":
      case "8":
        zoneName = "East & Central India (WB, Bihar, Odisha, Jharkhand)";
        cityHub = "Kolkata Central Hub";
        estimatedDays = 4;
        break;
      case "9":
        zoneName = "Western / Armed Services";
        cityHub = "Western Hub";
        estimatedDays = 5;
        break;
      default:
        estimatedDays = 4;
    }

    return {
      serviceable: true,
      pincode: cleanPin,
      zone: zoneName,
      nearestHub: cityHub,
      carrier: "Delhivery Surface & Air Express",
      codAvailable: true,
      prepaidAvailable: true,
      estimatedDeliveryDays: estimatedDays,
      estimatedDate: new Date(Date.now() + estimatedDays * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric"
      }),
      shippingCharge: 0, // Free delivery promo or default
      message: `Delivery available in ${estimatedDays} business days via Express Courier`
    };
  }

  /**
   * Create Shipment / Generate AWB & Initial Milestone Timeline
   * @param {Object} order 
   * @returns {Object} shippingInfo
   */
  static createShipment(order) {
    const awbPrefix = "DLHV";
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    const awb = `${awbPrefix}${randomDigits}`;

    const city = order.address?.city || "New Delhi";
    const pincode = order.address?.zipcode || "110001";
    const serviceability = this.checkPincodeServiceability(pincode);

    const initialTimeline = [
      {
        status: "Order Placed",
        title: "Order Placed & Confirmed",
        location: "System",
        timestamp: new Date(),
        note: "Order has been registered in warehouse fulfillment queue."
      },
      {
        status: "Manifested",
        title: "AWB Generated & Manifested",
        location: serviceability.nearestHub || "Central Warehouse",
        timestamp: new Date(),
        note: `Assigned to ${serviceability.carrier || 'Delhivery Express'}. AWB: ${awb}`
      }
    ];

    return {
      carrier: serviceability.carrier || "Delhivery Express",
      awb,
      trackingUrl: `https://www.delhivery.com/track/package/${awb}`,
      estimatedDelivery: serviceability.estimatedDate,
      estimatedDeliveryDate: serviceability.estimatedDate,
      timeline: initialTimeline
    };
  }

  /**
   * Append status milestone to shipping timeline
   * @param {Array} existingTimeline 
   * @param {string} newStatus 
   * @param {string} location 
   * @param {string} note 
   */
  static appendMilestone(existingTimeline = [], newStatus, location = "Hub", note = "") {
    const statusTitles = {
      "Order Placed": "Order Placed Successfully",
      "Processing": "Order Processing & Pick in Progress",
      "Packing": "Package Packed & Quality Checked",
      "Shipped": "Handed Over to Courier Partner",
      "In Transit": "Package In Transit to Destination Hub",
      "Out for delivery": "Out for Delivery with Courier Executive",
      "Delivered": "Shipment Successfully Delivered",
      "Cancelled": "Order Cancelled by Customer",
      "Returned": "Return Shipment Initiated (Reverse Pickup)",
      "RTO": "Returned to Origin (RTO)"
    };

    const newMilestone = {
      status: newStatus,
      title: statusTitles[newStatus] || newStatus,
      location,
      timestamp: new Date(),
      note: note || `Shipment status updated to ${newStatus}.`
    };

    return [...existingTimeline, newMilestone];
  }
}

export default ShippingService;
