type ConfigItem = {
    item: string;
    quantity?: string;
    description?: string;
};

type RequirementPayload = {
    model: string;
    manufatured: string;
    warranty: string;
    warrantyType?: string;
    quotationValidity: string | Date;
    notes?: string;
    configuration: ConfigItem[];
    vendorNames?: string[];
};

export function requirementEmailTemplate(data: RequirementPayload) {
    const specs = data.configuration
        .map(
            (c) => `
      <tr>
        <td style="border:1px solid #ddd">${c.item}</td>
        <td style="border:1px solid #ddd">${c.quantity || "-"}</td>
        <td style="border:1px solid #ddd">${c.description || "-"}</td>
      </tr>
    `,
        )
        .join("");

    const vendors = data.vendorNames?.length
        ? data.vendorNames.map((v) => `<p>${v}</p>`).join("")
        : "<p>N/A</p>";

    return `
<table width="100%" cellpadding="0" cellspacing="0">

    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:24px; border-radius:6px;">
          <tr>
            <td style="font-size:20px; font-weight:bold; padding-bottom:16px;">
              Asset Request – Quotation Required
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-bottom:12px;">
              Dear <strong>[Vendor Name]</strong>,
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-bottom:12px;">
              I hope you are doing well.
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-bottom:16px;">
              We would like to request a quotation for the following asset(s). Kindly share your best pricing along with
              availability and expected delivery timelines.
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:16px;">
              <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                <thead>
                  <tr>
                    <th style="border:1px solid #ddd;">Item</th>
                    <th style="border:1px solid #ddd;">Quantity</th>
                    <th style="border:1px solid #ddd;">Description</th>
                  </tr>
                </thead>
                <tbody>
                    ${specs}
                </tbody>
               
              </table>
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-bottom:12px;">
              Additionally, please include the following in your response:
              <ul style="margin:8px 0 0 18px; padding:0;">
                <li>Unit price and total cost (including applicable taxes)</li>
                <li>Delivery timeline</li>
                <li>Warranty / support details</li>
                <li>Payment terms</li>
                <li>Quotation validity</li>
              </ul>
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-bottom:16px;">
              If you have any alternative recommendations that meet similar specifications, please feel free to include
              them as well.
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-bottom:20px;">
              Thank you for your support. We look forward to your quotation.
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6;">
              Best regards,<br />
              <strong>Deepak Gusain</strong><br />
              [Your Designation]<br />
              [Your Company Name]<br />
              [Your Phone Number]<br />
              [Your Email Address]
            </td>
          </tr>

        </table>
`;
}
