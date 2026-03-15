-- Seed a demo user
INSERT INTO users (email, password, organization_id)
VALUES ('admin@test.com', 'password123', 'org1')
ON CONFLICT DO NOTHING;

-- Seed another demo user
INSERT INTO users (email, password, organization_id)
VALUES ('user@test.com', 'demo123', 'org1')
ON CONFLICT DO NOTHING;