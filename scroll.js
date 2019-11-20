// Scroll ih block
$(".all_companies_home").on("scroll", function(){
                    let data_type = $(this).data('type');
                    let csrf = $('meta[name="csrf-token"]').attr('content');
                    // console.log("Scrolled :P " + $(this).scrollTop());
                    if ($(this).scrollTop() +
                        $(this).innerHeight() >=
                        $(this)[0].scrollHeight) {

                        // alert('End of DIV is reached!');
                        $.ajax({
                            method:'POST',
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            url:'/ajax-home',
                            data: {
                                data_type: data_type
                            },
                            success:function(data){
                                if(data.html == 'empty'){
                                    // $(target).closest('.load-more__wrapper').hide();
                                    // $('.all_companies_home').html("<p class='text-center'>Не найдено</p>");
                                }
                                if(data.length == 0){
                                    // :( no more articles
                                }else{
                                    if(data.html !== 'empty'){
                                        $('.all_companies_home').append(data.html);
                                    }
                                }
                            }
                        });


                    }
                })
