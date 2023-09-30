![header](https://capsule-render.vercel.app/api?type=waving&color=timeGradient&text=CompositionAPI를%20사용한%20쇼핑몰%20구현👕&animation=twinkling&fontSize=23&fontAlignY=40&fontAlign=70&height=250&width=1325&align=center)
<br>
<br>
<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo= vuedotjs&logoColor=#fff"/>
  <img src="https://img.shields.io/badge/axios-412991?style=flat&logo=axios&logoColor=#5A29E4"/>
  <img src="https://img.shields.io/badge/html5-E34F26?style=flat&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/css-1572B6?style=flat&logo=css3&logoColor=#fff"/>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=white"/>
</div>
<br>
<br>
<br>
<div align="center"">
🔗 [쇼핑몰 바로가기]  (https://main--clinquant-twilight-679959.netlify.app/)
</div>
<br>
<br>
<br>

## 🛠️ Tech
**1. vue3.0**<br>
>*npm init vue@latest*<br>

**2. router**<br>
>*npm install vue-router*

**3. axios**<br>
>*npm install axios*

**4. pinia**<br>
>*npm install pinia*

<br>

## ❗️ Rules
**1. 새로고침(refresh)를 하지마세요**<br>
>*해당 프로젝트는 서버가 아닌 Pinia와 LocalStorage로 구성된 프로젝트입니다.*<br>
>*새로고침을 하게되면 pinia에 저장된 모든 데이터가 유실됩니다.*<br>

**2. 사용자의 PC에 저장된 LocalStorage가 있을 경우 충돌이 발생할 수 있습니다.**<br>
>*로그인 및 회원가입이 정상적으로 실행되지 않는다면 LocalStorage에 저장된 key값 중 user를 삭제하고 다시 실행하세요.*<br>
>*해당 프로젝트 종료 후 LocalStorage에 저장된 데이터를 삭제해주세요.*<br>

**3. 오류가 발생하거나 빈화면이 노출되는 경우**<br>
>*URL의 end point로 다시 접속해주세요.*<br>

<br>

## 🖥️ Views
**1. index**<br> 
 - 사이트의 메인화면 입니다. 우측 상단의 JOIN 버튼을 눌러 회원가입 화면으로 이동해주세요.<br>
![main](https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/b45636a2-b38c-41f8-87d0-94b9ca9068d2)

<br><br>

**2. Join**<br>
 - ID와 Password, Email은 validation을 통해 유효성 검증이 통과되면 회원가입을 진행할 수 있습니다.<br>
 - 우편번호는 kakao의 우편번호 서비스를 이용하였습니다. 🔗 (https://postcode.map.daum.net/guide)<br>
 - 기입한 정보는 Pinia와 LocalStorage에 저장됩니다.
<img width="1451" alt="Join" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/2f993d19-b049-4d80-8e5f-02b02484f35d">

<br><br>

**3. Login**<br>
  - 로그인 정보는 Pinia에 저장됩니다.<br>
  - REMEMBER ME를 클릭하면 로그인 정보가 LocalStorage에 저장되고 새로고침을 해도 데이터가 유실되지 않습니다.<br>
<img width="1463" alt="login" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/3fa6e3a5-aefa-4c6e-9650-94d2971b0066">

<br><br>

**4. Find Info**<br>
  - LocalStorage에 저장된 정보를 통해 ID와 Password를 확인할 수 있습니다.
<img width="1394" alt="findInfo" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/cb1138f4-9de5-41ff-b742-7a7404d0afeb">

<br><br>

**5. ProductList**<br>
  - 다양한 상품 목록을 확인할 수 있습니다.
<img width="1470" alt="productInfo" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/137015ac-a57c-41ea-81e1-87fdc3323790">

<br><br>

**6. ProductDetail**<br>
  - 클릭한 상품의 상세화면 입니다. 
  - 상품을 WishList에 담거나 구매할 수 있습니다.
  - 상품은 구매할 경우 개수가 차감됩니다.
<img width="1457" alt="productDetail" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/296d6070-a65c-402e-a25f-7cac06d39d2c">

<br><br>

**7. Payment**<br>
  - 선택한 상품의 구매 화면입니다.
  - 배송 메시지를 정하거나 입력할 수 있습니다.
  - 상품을 구매할 경우 총 주문 금액의 2%가 적립금으로 지급됩니다.
  - 현금영수증 발급 정보를 기입할 수 있습니다.
<img width="1450" alt="payment" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/cf94fadb-97a5-4922-be83-4aad063d00bd">

<br><br>

**7. OrderHistory**<br>
  - 구매한 상품의 상세 조회 화면입니다.
  - pinia의 orderList에 저장됩니다.
  - 저장된 사용자의 정보 및 배송 메시지, 현금 영수증 발급 정보, 구매한 상품의 상세 내역을 확인할 수 있습니다.
  - 하단의 '주문내역' 버튼을 클릭하여 주문 목록을 확인할 수 있습니다.
<img width="1441" alt="orderHistory" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/c2115eb2-5364-44da-88c0-0a12a15b19c5">

<br><br>

**8. OrderList**<br>
  - 구매한 상품들의 목록입니다.
  - '[주문 상세 내용']을 클릭하여 상세 조회 화면으로 이동할 수 있습니다.
<img width="1453" alt="orderList" src="https://github.com/whiteDwarff/Vue3_Shop/assets/115057117/b41b9be7-6d42-4475-a4fb-d5c56de1bfd7">



