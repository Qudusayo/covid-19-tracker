/* start script */

$(()=>{
   $('.alert').hide();
  form=$('form').submit(ev=>{
    ev.preventDefult();
  });
  $('.card').hide();
  // for button action 
  $('.loader').hide();
  if(localStorage.getItem('query')){
    localStorage.getItem('query');
    $('.saved').text(`Your recent search was ${localStorage.getItem('query')}`);
  }
  
  $('.btn-warning').click(e=>{
    $('.loader').fadeIn();
  search=$('.form-control').val();
   //set storage item 
    localStorage.setItem('query',search);
    console.log(localStorage)
if(search !==''){
  setTimeout(()=>{
    $('.loader').hide()
    $('.form-control').val('');
    console.log(search)
    url=` https://coronavirus-19-api.herokuapp.com/countries/`;
    endpoint=`${url}${search}`;
    console.log(endpoint);
    
    fetch(endpoint)
      .then(info=> info.json())
      .then( res=>{
        console.log(res);
        $('.card').fadeIn(2000)
       $('.country').text(`country : ${res.country}`);
       
       //anoda call
       $('.cases').text(`cases : ${res.cases}`);
       $('.today').text(`Today Cases : ${res.todayCases}`)
       $('.recovered').text(` Recovered : ${res.recovered }`);
       
       $('.deaths').text(`Deaths : ${res.deaths}`);
       $('.todayDeaths').text(`Today's Death : ${res.todayDeaths}`);
       $('.total').text(`Total Test ${res.totalTests}`);
        $('.alert').hide();
      }).catch(err=>{
        //now shshow error elemen
        $('.alert').fadeIn(1000);
        $('#msg').text(`oops something when wrong `)
        $('.card').fadeOut();
      });
  },3000);
}else {
  location.reload();
  $('.card').html(`cant find result for empty value`);

}
  

  });
  //click function to camcel alert
  $('.cancel').click(()=>{
    $('.alert').fadeOut(1000);
    $('.card').show();
  });
  
});

