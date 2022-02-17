@component('mail::message')
# You have received coupon!

## Type: {{ $coupon->type }}
## Expired: {{ $coupon->expired_date }} days left
 
@component('mail::button', ['url' => 'http://127.0.0.1:8000/user/coupon'])
View Coupon
@endcomponent
 
Thank You For Shopping With Us,<br>
{{ config('app.name') }}
@endcomponent