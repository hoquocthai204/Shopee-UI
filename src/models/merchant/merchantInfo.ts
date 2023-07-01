export interface MerchantInfo {
  id?: number;
  businessName: string;
  businessIndustry: string;
  mccCode: string;
  businessPlace: string;
  serviceDescription: string;
  storeType: string;
  websiteUrl: string;
  storeAddress: string;
  storePhoto: string;
  annualPayment: string;
  monthlyPayment: string;
  ortherAmount: number;
  monthlyTxnNumber: string;
  averageDeliveryTime: string;
  userId?: number;
}
