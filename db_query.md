```
INSERT INTO advertisers (name, email, address_line_1, city, state, zipcode, country, website_link)
VALUES ('Sagravia LLC', 'info@sagraviallc.com', '30 N Gould St', 'Sheridan', 'WY', '82801', 'USA', 'https://www.sagraviallc.com');
```

```
INSERT INTO campaigns (name, no_of_emails, website_id, type, advertiser_id, price, date)
VALUES (
    '7_OCT_2024',
    600,
    1,  -- Assuming website_id 1 exists
    'Email',
    1,  -- Assuming advertiser_id 1 (Sagravia LLC) exists
    0,
    TO_DATE('07-10-24', 'DD-MM-YY')  -- Inserting the date in dd-mm-yy format
);
```
