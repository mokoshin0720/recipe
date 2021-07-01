$(".delete_btn").on("click", function() {
    if(!confirm('本当に削除しますか？')){
      return false;
    }else{
      var delete_id = $(this).attr('delete_id')
      console.log(delete_id)
    //   var index = '{% url 'index' %}'
      var index = 'http://0.0.0.0:8000/'
      var url = index+'delete/'+delete_id
      location.href= url
      alert("削除しました。")
    }
  });