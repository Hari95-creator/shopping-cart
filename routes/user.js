
var express = require('express');
var router = express.Router();
var producthelper=require('../helpers/product-helpers')
var userhelper=require('../helpers/user-helpers');
const { use } = require('./admin');

/* GET home page. */
router.get('/', function(request, response, next) {

//   let products=[
//   {
//       name:"S6 Edge",
//       category:"Mobile",
//       description:"provided with snapdragon835",
//       image:"data:image/jpeg;base64,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"

//   },
//   {
//     name:"iphone 12",
//     category:"Mobile",
//     description:"provided A11-Bionic Chip",
//     image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBESERIREhERDxESERIRERESEhEQEhISGBQZGRgUGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiU7QDs0Py41NTEBDAwMEA8QHxIRHDQjISExNDQ0NDE0MTQ0NDExNDQ0NDE0NDQ0NDQ0NDE0NDQ0NDE0NDQ0NDE0MTE0NDQ0MTQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBgcFBAj/xABMEAACAQIBBggJBg0DBQEAAAABAgADEQQFBxIhMUEGIjRRYXFzshMyUnSBkaGxwhckJULB4RQjM1NicoKDkqLD0dI1Y/AVVGSE8UP/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgEDBP/EACERAQACAgMAAgMBAAAAAAAAAAABAhExEiEyA0ETIqGB/9oADAMBAAIRAxEAPwDZp5MdiCicUaTsdFF52Oz0b565zcRrxC32U6TuOtjo/Z7YES0VU6T/AI6qdrNYgdAGwCRrlWmahpivRNQGxQOGYHmIGwyn5z8vVMLhVp02KPWDM7KSG8GLDRBGsXLoL82lMTp1KrWe7bTo6J0QNFSx0QNlgN0yImdGX1SjOd6H1zy5WygcNRes+iQo1KL6TMdQUdJMoGabhTWr+EwmIdqrUlR6VRiWdqZYKVYnxtEstiddiRzTtZwcQScNT+qXeoR0onFPrMCuY7HVK7eErtpvrK0/qU122VTqFrbTzTxf9UQvoK6F9gUG59U4nCPHmnTCKSpqAu7DboDSsB6EPpIO6U6kaj61BALAAKbaydQ6T7YiJnRnDVxUq3tqUjaCpBHokivWNgChJIVRY6yTYCVngflipVFTDVWNTwdJ61B2JZ0CWL07nWVKkkA7CJdeDiCpjaYOsIj1Oi4svucyZnDY7WnJuTEoIrVAKlYjWbbCdoUbhJa+VERxTetQpOdlNnGnbdxRsnL4aZXbC4SrVQ6NRiKdNtR0L+M4B3hQxHSBPn98TVrMzksQWubsb3Y7WYnjMec7dc51rN56dLTFYfUVI1GFw1Nh0aUSvUdEao7U1RFLMTpagBczHs2PCnEJiVwdV3qU6gcUw5LNSdFL6IJ1hSFYaO42Itrvo3D7ElcGVBsKr06Zt5LNr902K94lM26ypuWMtVMW2lUJFK/4uiLhbbAzD6xPTzzlHKCKy09NELMFFyLAk2/5a88WVMWadN2HjE6C9Vhf1llHVeUo1XcuwJsLlmvYkD6xP2bp6/MYiHmiJt3MtZGAr+XTHWHEkXAYj85T9Tzj8FsrG1GmxstRhRqUzsp1r6AdB9XjWuBqIaWpKuw7tV+qVExMImJrLnHCYldd6b9ALKfaLQoYm5KMCjjarbevpHTLhja+H/B9TIdXFUW0r7tUp2VGGgKn1qZBB51JAZerXf0TK2zGsNtGJ3l7FMcpnnpvcAyYNNEoMcDIwY4GA8Rho2YOjGjVButROK1/0reOOg+yPBi3gWzg5lU4imwcBa1JtCqo2E7VdehhrnZlG4OVNDHKAdVXDurDpRlYH+Yj0y8zjaMS7VnMFhEizFCc3EW8O22/4Oeq2lOlObify7ebHvzJFAzm5GbE0A6AsaS2YAEkIyodIDfZkU25rzGBQxCcTQc2LWKKXXWNE2I1bJ9L1dbMN1k7glRxtfIvhfxjUGqX1lab1Fv+uqke2ItMaMOXmiyK9NqmIqCzuERV26FNW02JOzSZlQW3BT1Tp8OMUr4umilSadN9IX4w0tQNua6OL/omW7Jb0vBqaBQ0yOKaZBX2TJsRp/8AUMWz34yYYpfyRSdSOjjK3pvA4vCFNIodoFMA9TFwfYTK0iVU1KCwDBgVBYaQ2HoOvYdctmUDx07JO885dSnQvxjYjcLsB6gbREzGiYergkgptUdtdSpSahTQa9BXID1GO6yggDnaaPwMe+O1W/IVNV9dg6XI9Nh6+aUPJwRRenax3g3v6ZZs2rlspux1j8CZR0MK/GHXrB9Mm2lV2tvDbJrYnCPTQXdSXVfKsxBX0qSPTMEfCV6LMgViAw2KSbg3GkPqnoPun0tWOsdTd4yq5cq5IFS2KNE1AbMBTaqynmbQU6PpnKt5rp0msW2o2bLItR8YuIqAr4MPoKfGLuhTSbmADMdesm00HOJi08HSo3GkKqNa+uwI2Df4y35rjnnV4P1MIad8IaZQbfB2FjzMNoPWJn/DbTOUlZr6AR1HQ3h6R7pT1SqWm14yi8YrKt5Z1qo52qW32I0CD65VWouhYKCysNajjEC97ED37DLXlI+J+tU9yTlVtDY1ue1tL02ntmM9vJW2Ons4Iuwr6dQ+K/hlT6z1AbjVuGlY6/Jl2xGUVpJdydVhqsWYkHiqN5Nj0C15QsDUWm6ulrK2u24HaOjVOjlrFEFGvxQxU9bKpHsU+qNR031bt3U4S072fD1AvlpWRqnXolAD1XHXPdjXBpFkcPTqIWSoAQGGlY3B1qwIIKnYRKV+EJbVe+rXcW9UseAqfMgD9arXan+oFpq1ujTB9RkxM5xJasYzDs0H4q9QnoVp4aLcUdQkyvKY9itHhp5VeSq8D0gx15ArSQGB68hf6hh+yxPqsn3S/Sg5C/1DD9lifdTl/nK23WmhCEJKxObify7eb/HOlObWF8Tb/wAf45kjO86WWWw9EUkNjVUs9r8ZFWmuh1Fqi35wpG+Y4BUfjEkknUb6/FLahzWG7om25y+D74mgtRFLPSDI6gXY02trXpBVD+zbfMVfB104ttK1wGVhYarawbEaidRAM2uPtk5XXNblyomK/B2YslTikE312Oi3WCLdRlo4X4daeIVl1eEDEjcCAbkdd7//AGV3NpweqLWGIcWC8a+4mxso59pN+qWTho342l1P7pMqZ9lytolNuukCbajorpsfXa3plcph3sb71VQCFF2NgFHoloy5hSyq4Gl4MMrjf4Nr8YdWk3VcHdKx4N11KQyg3UhgpHMSCbj/AJrlVx9sl78k4sq+iTfZfpBsAT0gke2aTm3pgZQqMDqbDMSu7S001zMMm4chtetjYm2wL1/82Dpmn5tGvjm82fvpJtpVdrLw5ym2FwjuhKO5NNXG1Llmdh0hFa3TaYE1V6pZ2NhttpWAuQLC/X759DcN8jtisK6ILuh8IgOoMRrKHoIuOpjMBxOTq9FmQISAdhIV117GF77to1cxk/FNY22+fp1+BmWquExlMaTW0tF1Jvdb8ZTz6r9RAM1Dh/h00KdUamNSmh5mGmCD1j7Zm3Ajg7VrYlHZeKpBc7Qq31i+8nZbpmlcPT83p9tT70zMfkjDJzwnLNMrOQFI26dQC+sXOgB75WdNn0iCQgudttQ3nnY/bLZlGgXQhfGB0033NtYHOdQPTa0qr0SpOiAVa50dIAjoF9o6R6bT1W/jhTH+pKFZkcq1zbS6Txbll6tR9NjLPh0FWnY6LEDwbK3iuAdV943WO4yrYegSxZrEm4232+MSee1/XrnbyfXKsVB1surm0gNX2zax0m89xh66WSKStc06jfoGqAnrC6Vp19MkNfRGigRVUaKootooo3DXf033yq4HwnhRqbT0gWJve19ZY80swN7KNrkAdQNyYjGNMtnqJnLrU21DqEmV55gY8NNHpV5Mjzxq0kV4HuR5IrTxo8mV4HSyG4GUMNcgXp4kC5tckU7AdM0OZnkgFsoYSwJsKzHZqUBLmaZOV9utNCEISVic6pyr9x8c6M5RJ/C313AoLYc3HmSPRUphug885OI4PYd202oUmbyrEGdqEDnpk4KLKiqBuBIlG4f0dCpQ1WuKm8nYB/eaVM1zk1D+EUV3BCQOk6Vz7B6oFVte24jYRtE8lTJFJzc00vzqXS/oU29k9CNJVaGvPSyXTXxaaj9t5as3+GCY4kLa+HceMT9dOecNWll4CAHFO29aYX0M1z3RJtpsbaGygzl43IVCqdKpSpuedl1+ydeE5TGXTLmUMlog0URFHMLiVbOLQ0cKht/+1IbSfrS+SjZ0HIw9JdxrIT02ItKpX9oRef1lneo6jIauBRzdlVidp4yk9ZUi/pj1aSK09rxvOuS6fkD+N/7yVMmUwQdDWDccd/7z0q0kVoyzBUo9C+tj9smpoAb7Sd/2RitJA0NSho8GQAx4aBKDHq0hBjgYHpRpKjzyAyVWhrscG6oGUcNe50qeIUW5yqHX6ppcy3g2fpHCfq1+4s1KcrbdaaEIQkrE5R5W/YL3p1Zym5W/YL35kj2QhCAszDOUfnVP9T7XmnzL85fKafZ/a8Cpq0lVp51aPVoa9StLTm/Pzqp2dP3vKirS2ZvD86qfqJ73k202NtKhEEWc1iULOn+QpdqneEvsoWdT8hS7VPeJdPUIv5lnCmSq086mPVp63kehWkqtPMrSRWgelWkitPOrR6tA9IMUGRKY8GBKpjwZCDHgwJQY8GRAxwMDscFU0spYbXbRp4huvioLe32TU5k/BjXlHCdVfuLNYnK23amhCEJKxOW6gYokDWcOLnns+qdSc6ryr/1/jmSPRCEICzNM6CAVaDb2DgnoGwe0+uaXM2zp/lMP+89ywKKpkimQAx6mGp1aWnN4fnzc3gG1dTJ/cypqZas3R+fN5u/fSTbTY21OESLOboWUfOkg/BEbeK1MDou2uXgSk50uRr29LvSqeoc7+ZZWpj1MhBjwZ7HkTKZIrSBTHqYHoVpKpnnUx4qAEAkAnYLi59ED0K0kUzx3OlrNgOm156FaGPQDHAyIGOBhqYGPBkIMeDA7HBUE5RwtgTZcQTbcNBdftE1iZZwK/wBRo9jifgmpzlbbtTQhCElYnNq8qHm/xzpTm1eVDzf45kj0whCAszXOr4+H/ee5ZpMzXOr4+G/ee4QKEDHAyMR4MNSKZbM3B+fN5u/fSVAGW3Nsfnzebv30k202u2rQiRZydCyk50+RL29LvS6ylZ0+RL29LvS6eoRfzLJwY4GMBigz2PGlBkimQAx4MCSrU0UZt4Ukde6cJahDB73a+kSd5naddJWXnUj2TgNcEg6iNRHTNhMrEtQEAjYQCOqeygLKOnXOHgKt00d6m3oOydXDVCRbcN/2RJD3K0kBkCtHq0xSYGPBkQMcDAsPAk/SNHscT/TmqzKeA5+kaXY4n+nNWnK23amhCEJKxOZW5UPN/jnTnMr8qHYfHMkem8Lxt4XgOvM1zqnj4b957lmkTNc6vj4b9v3CBQooMaDFhqQGW3Nry5vN376SoAy3ZtD8+fzdu+km2m121eESLOLoWUnOnyJe3pd6XWUnOpyJe2pd6X8fqEX8yycGLGiKDPa8ZwMeDIwY4GBIpkNfBJUbSuVO+1tf3yQGPBgRUsEim6lhqsdd7z3UwALCQqZIrQJ1aSq086tHq0D0K0eDIFMkVoFk4Cn6RpdjiPgmsTJeAZ+kaXY4j4JrU5W27U0IQhJWJzMRyodh8c6c5eJ5UOw+OZImvC8bC8B0zbOr4+H66nuE0i8zbOp4+H639wgUIGKDGAxwhp0t2bPlz+bv30lQEt+bLl7+bt30k202u2sRYkJxdSyk51ORDtqXel2lIzqciHb0u9K+P1DnfzLJhFjRFnueM4RwjIoMBwMeDGCAMCYGPUyEGPBgTqZIpnnUyRTAnVpIDIFaPVoFo4An6Sp9hiP6c1yZDm+P0lT7DEf05r05W27U0IQhJWJysVykdh8c6s5WL5SOw+OZIkvFvGwgOmbZ0zx8P11PcJo95m+dPx8P11O6IFChEiw04S35seXv5u3fSU6XDNhy5/N276Sb+W121qEITi6llIzqciHbUu9LtKRnU5EO2pd6V8fqEX8yyWLEhPc8R0WNiwHAxwjIoMBwMeDGAwBgTAx4MhBjwYEymSK0gDR4MC2ZvD9JU+wxH9ObBMczcH6STsK/wTY5ytt2poQhCSsTk4vlI7D451pycZykdh8cyQ68W8bCA68zjOl4+H66ndE0WZznS8fD9b92BQoQhDSy35sOXP5u3fSU+XDNhy5/N276SbabXbWosSE4upZSM6nIR21LvS7ykZ1OQjtqXelfH6hF/MslhEEWe54hFiQgOEWNigwHAxRGRwMBwMeDIwYoMCUGSAyAGPBgW/NufpKn2Ff4JskxnNofpJOwr/BNmnK23amhCEJKxORjeUjsPjnXnJxo+cA7vA2/nmSC8LxIQFvM5zpeNh+t+7NFmcZ0WGnhhvJqHYdyj+4gUWEIQ0S35sOXP5u3fSVCW7Ngfn79OHYfzofsk38trtrkIQnF1EpGdXkI7al3pd5SM6p+ZL21LvE/ZK+P1CL+ZZLCJFnueIsIkICwhCAt4ojYoMBwjhGCLeA8GOBjAYoMC4Zsj9JJ2Ff4JtExXNifpJOwrjuf2m0zlbbtTRYQhJWJyMbygdjb+Yzrzl5XpkBKqi/gydMD82w4x9Fr+uZIjhGqwIBBuDrBjrwCZ3nRXXhzu03H8l/smiSq8PMmmvh7qOOh0l6xu6jAyiENewggjUQdRB5jCGllszZ1AMoEeVh379OVKe3ImUjhMVRxGvRpvZwNd6bCzat9r6VudRJtGYbG2/QkWFxKVUWojK6OoZWUhgQRcEHfqMlnB1EpedGmWwOrdVpseoNeXScfhTk4YjC1KflKR6d0uk4tEpvGazDBRCPxFF0dqbjRdDYjZ6R0GMnueERYkICxY2LAWESEBwMUGNhAfFvGCLeBdM1iE5R0hsWhVv6SlvdNnmd5qsiPTp1MXUUq1YBaYIsfBg3LW6TNEnK09u1IxAiwhJWIkWEDk18mFbtRbRvr8GbFCejmnnFHF76Sfs1L++07sIHD8FifzK/xr/lI6uHxLAqaCkH9NP8AKWGEzAy3K/AKvVYulNUY7w6qfeROV8m+UP8AbHNxlP2zZoTRjPybZQ56X8Q/yiHNtlD/AGv4h/lNohMwMt4P8Hct4E6NJqNWje/gajgAbb6LXOjcnpHRc3lyoVscR+Mwiqd+hWpuPWSPdO/FkzWJVFphxfCYn/tj/HS/zgzYkixw389P/KdmEfjg5SzrL/A6pijpDD6D7mFSmCP5tcrbZs8ffUaYH6TIx9hE2mEuszXqEWrFtsW+TLKHl0vWP7xfkwx/l0fX982iErnKeEMX+THKHl0fX98Pkxyh5dH1/fNohHOThDF/kxyh5dH1/fD5MsoeXR9f3zaIRzk4Qxj5MsoeXR9f3w+TLKHl0fWR9s2eEc5OEMaGbHH/AJygOfWxllyBm2oUmWpiXbEOpBCWC0wRvNtbemaBCZNpbFIg1VAAAAAAsANQA5o+EJihCEIBCEIBCEIBCEIBCEIBCEICRYQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgf//Z"
// },
//   {
//     name:"Vivo v-5",
//     category:"Mobile",
//     description:"provided with snapdragon835",
//     image:"data:image/jpeg;base64,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"
//   },
//   {
//     name:"Redmi-10T",
//     category:"Mobile",
//     description:"provided with snapdragon835",
//     image:"data:image/jpeg;base64,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"
//   }
// ]
//   response.render('index', {products,admin:false});

producthelper.getAllproducts().then((products)=>{

  response.render('users/view-products',{admin:false,products});


})

router.get('/userlogin',(request,response)=>{

  response.render('users/userlogin')

})

router.get('/signup',(request,response)=>{

  response.render('users/signup')

})
router.post('/signup',(request,response)=>{

  userhelper.doSignup(request.body).then((response)=>{
      console.log(response)
  })

})
router.post('/login',(request,response)=>{
  
  userhelper.doLogin(request.body)

})
});

module.exports = router;
