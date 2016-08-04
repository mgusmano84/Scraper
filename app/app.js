$(function() {
    



$('#comment').on('click',function(){
	var comment = $('#userComment').val().trim();
	var commentId =$('#userComment').data('id');
	$.post("/comment", {'comments': comment, 'id': commentId },
			    function(data){
			    	if(data){
			    	$('.commentsection').append('<li>'+comment+'<button type="button" class="btn btn-default btn-xs delete" data-text='+comment+'><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></li>');
			    }
			    });
})


$(document).on('click','.delete',function(){
	var comment = $(this).data('text');
	var commentId =$('#userComment').data('id');
	
	$(this).parent().remove();
	$.post("/delete", {'comments': comment, 'id': commentId },
			    function(data){
			    	if(data){
			    		
			    	console.log('success')
			    }
			    });
})


	// $(".mainbutt").on('click', function() {
		
	// })

});