export interface PaymentDetails {
    id: number;
    user_id: number;
    paypal_email: string;
    account_type: string;
    bank_account_no: string;
    bank_holder_name: string;
    bank_name: string;
    ifsc: string;
    is_default: string;
    swift: string;
    status: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}