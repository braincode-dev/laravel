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

// Scroll in typing input
$(document).on('keyup', '.chosen-search-input', function(){


                    // let search = $('.chosen-search-input').val();
                    let search = $(this).val();
                    let data_type = $(".data_type").val();
                    let that = $(this).closest('form');
                    // console.log(that);
                    $.ajax(
                        {
                            url: "/construct",
                            type: 'post',
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data: {
                                search: search,
                                data_type: data_type
                            },
                            success: function (result) {
                                let res = result.html;

                                that.find('.chosen-results').html(res);

                                // console.log(result.option);
                                $('.modal').on('click', '.get_list_comp', function(e){
                                    var companyId = $(this).data('option-array-index');
                                    var companyName = $(this).text();
                                    // console.log(companyId);
                                    let thaten = $(this).closest('form');

                                    if (companyId && companyName) {
                                        let newOption = new Option(companyName, companyId, true, true);
                                        // Append it to the select
                                        thaten.find('.add-comment-form__company').append(newOption).trigger("chosen:updated");
                                        // $('#add-comment-form__company').closest('form').trigger('change');chosen:updated

                                    }

                                });
                                // $('.chosen-select').trigger('change');
                            },
                            error: function (error) {
                                // console.log(error);
                            }
                        });
                });
