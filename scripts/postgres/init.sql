DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status_enum') THEN
        CREATE TYPE payment_status_enum AS ENUM ('PENDING', 'APPROVED', 'DECLINED');
    END IF;
END $$;

CREATE TABLE payments (
    payment_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    product_id CHAR(24) NOT NULL,
    payment_amount NUMERIC(10, 2) NOT NULL,
    payment_currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    payment_status payment_status_enum DEFAULT 'PENDING',
    payment_description TEXT,
    payment_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_id ON payments (product_id);
CREATE INDEX idx_user_id ON payments (user_id);
