/* 2.5js兼容 */

function ajax_request(url, params)
{

    return AWS.ajax_request(url, params);
}

function ajax_post(formEl, processer) // 表单对象，用 jQuery 获取，回调函数名
{
    if (typeof (processer) != 'function')
    {
        processer = _ajax_post_processer;
        
        AWS.loading('show');
    }

    var custom_data = {
        _post_type: 'ajax'
    };

    formEl.ajaxSubmit(
    {
        dataType: 'json',
        data: custom_data,
        success: processer,
        error: function (error)
        {
            if ($.trim(error.responseText) != '')
            {
            	AWS.loading('hide');
            	
                alert(_t('发生错误, 返回的信息:') + ' ' + error.responseText);
            }
        }
    });
}

function _ajax_post_processer(result)
{
	AWS.loading('hide');
	
    if (typeof (result.errno) == 'undefined')
    {
        AWS.alert(result);
    }
    else if (result.errno != 1)
    {
        AWS.alert(result.err);
    }
    else
    {
        if (result.rsm && result.rsm.url)
        {
            window.location = decodeURIComponent(result.rsm.url);
        }
        else
        {
            window.location.reload();
        }
    }
}

function _ajax_post_modal_processer(result)
{
    if (typeof (result.errno) == 'undefined')
    {
        alert(result);
    }
    else if (result.errno != 1)
    {
        alert(result.err);
    }
    else
    {
        if (result.rsm && result.rsm.url)
        {
            window.location = decodeURIComponent(result.rsm.url);
        }
        else
        {
            $('#aw-ajax-box div.modal').modal('hide');
        }
    }
}

function _ajax_post_alert_processer(result)
{
    if (typeof (result.errno) == 'undefined')
    {
        alert(result);
    }
    else if (result.errno != 1)
    {
        alert(result.err);
    }
    else
    {
        if (result.rsm && result.rsm.url)
        {
            window.location = decodeURIComponent(result.rsm.url);
        }
        else
        {
            window.location.reload();
        }
    }
}

function _ajax_post_background_processer(result)
{
    if (typeof (result.errno) == 'undefined')
    {
        alert(result);
    }
    else if (result.errno != 1)
    {
        AWS.alert(result.err);
    }
}

function _ajax_post_confirm_processer(result)
{
    if (typeof (result.errno) == 'undefined')
    {
        alert(result);
    }
    else if (result.errno != 1)
    {
        if (!confirm(result.err))
        {
            return false;
        }
    }

    if (result.errno == 1 && result.err)
    {
        alert(result.err);
    }

    if (result.rsm && result.rsm.url)
    {
        window.location = decodeURIComponent(result.rsm.url);
    }
    else
    {
        window.location.reload();
    }
}

function _error_message_form_processer(result)
{
    if (typeof (result.errno) == 'undefined')
    {
        alert(result);
    }
    else if (result.errno != 1)
    {
    	if (!$('.error_message').length)
    	{
	    	alert(result.err);
    	}
    	else if ($('.error_message em').length)
    	{
	    	$('.error_message em').html(result.err);
    	}
    	else
    	{
	    	 $('.error_message').html(result.err);
    	}
    	
    	if ($('.error_message').css('display') != 'none')
    	{
	    	shake($('.error_message'));
    	}
    	else
    	{
	    	$('.error_message').fadeIn();
    	}
    }
    else
    {
        if (result.rsm && result.rsm.url)
        {
            window.location = decodeURIComponent(result.rsm.url);
        }
        else
        {
            window.location.reload();
        }
    }
}

function _comments_form_processer(result)
{
    $.each($('a._save_comment.disabled'), function (i, e)
    {

        $(e).attr('onclick', $(this).attr('_onclick')).removeAttr('_onclick').removeClass('disabled').removeClass('_save_comment');
    });

    if (result.errno != 1)
    {
        $.alert(result.err);
    }
    else
    {
        reload_comments_list(result.rsm.item_id, result.rsm.item_id, result.rsm.type_name);

        $('#aw-comment-box-' + result.rsm.type_name + '-' + result.rsm.item_id + ' form input').val('');
        $('#aw-comment-box-' + result.rsm.type_name + '-' + result.rsm.item_id + ' form textarea').val('');
    }
}

function _quick_publish_processer(result)
{
    if (typeof (result.errno) == 'undefined')
    {
        alert(result);
    }
    else if (result.errno != 1)
    {
        $('#quick_publish_error em').html(result.err);
        $('#quick_publish_error').fadeIn();
    }
    else
    {
        if (result.rsm && result.rsm.url)
        {
            window.location = decodeURIComponent(result.rsm.url);
        }
        else
        {
            window.location.reload();
        }
    }
}

function shake(element)
{
    return AWS.shake(element);
}

function focus_question(el, question_id)
{
    return AWS.User.follow(el, 'question', question_id);
}

function focus_topic(el, topic_id)
{
    return AWS.User.follow(el, 'topic', topic_id);
}

function follow_people(el, uid)
{
    return AWS.User.follow(el, 'user', uid);
}

function check_notifications()
{
    return AWS.Message.check_notifications();   
}

function read_notification(notification_id, el, reload)
{
    return AWS.Message.read_notification(notification_id, el, reload);   
}

function notification_show(length)
{
    return AWS.Message.notification_show(length);
}

function ajax_load(url, target)
{
    $(target).html('<p style="padding: 15px 0" align="center"><img src="' + G_STATIC_URL + '/common/loading_b.gif" alt="" /></p>');

    $.get(url, function (response)
    {
        if (response.length)
        {
            $(target).html(response);
        }
        else
        {
            $(target).html('<p style="padding: 15px 0" align="center">' + _t('没有内容') + '</p>');
        }
    });
}

function bp_more_load(url, bp_more_o_inner, target_el, start_page, callback_func)
{
    return AWS.load_list_view(url, bp_more_o_inner, target_el, start_page, callback_func);
}

function content_switcher(hide_el, show_el)
{
    return AWS.content_switcher(hide_el, show_el);
}

function hightlight(el, class_name)
{
    return AWS.hightlight(el, class_name);
}

function nl2br(str)
{
    return str.replace(new RegExp("\r\n|\n\r|\r|\n", "g"), "<br />");
}

function init_img_uploader(upload_url, upload_name, upload_element, upload_status_elememt, perview_element)
{
    return AWS.Init.init_img_uploader(upload_url, upload_name, upload_element, upload_status_elememt, perview_element);
}

function init_avatar_uploader(upload_element, upload_status_elememt, avatar_element)
{
    return init_img_uploader(G_BASE_URL + '/account/ajax/avatar_upload/', 'user_avatar', upload_element, upload_status_elememt, avatar_element);
}

function init_fileuploader(element_id, action_url)
{
    return AWS.Init.init_fileuploader(element_id, action_url);
}

function htmlspecialchars(text)
{
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function delete_draft(item_id, type)
{
    return AWS.User.delete_draft(item_id, type);
}

function agree_vote(answer_id, value)
{
    return AWS.User.agree_vote(answer_id, value);
}

function question_uninterested(el, question_id)
{
    return AWS.User.question_uninterested(el, question_id);
}

function question_invite_delete(block_el, question_invite_id)
{
    return AWS.User.question_invite_delete(block_el, question_invite_id);
}

function reload_comments_list(item_id, element_id, type_name)
{
    return AWS.reload_comments_list(item_id, element_id, type_name);
}

function save_comment(save_button_el)
{
    return AWS.User.save_comment(save_button_el);
}

function remove_comment(el, type, comment_id)
{
	return AWS.User.remove_comment(el, type, comment_id);
}

function insert_attach(element, attach_id, attach_tag)
{
    return AWS.Editor.insert_attach(element, attach_id, attach_tag);
}

function question_thanks(question_id, element)
{
    return AWS.User.question_thanks(question_id, element);
}

function answer_user_rate(answer_id, type, element)
{
    return AWS.User.answer_user_rate(answer_id, type, element);
}

function init_comment_box(selector)
{
    return AWS.Init.init_comment_box(selector);
}

function init_article_comment_box(selector)
{
    return AWS.Init.init_article_comment_box(selector);
}

function insertVoteBar(data)
{
    return AWS.Init.init_vote_bar(data);
}

function agreeVote(element, user_name, answer_id)
{
	return AWS.User.agree_vote(element, user_name, answer_id);
}

function disagreeVote(element, user_name, answer_id)
{
    return AWS.User.disagree_vote(element, user_name, answer_id);
}

function init_topic_edit_box(selector) //selector -> .aw-edit-topic
{
    return AWS.Init.init_topic_edit_box(selector);
}

function show_card_box(selector, type, time) //selector -> .aw-user-name/.aw-topic-name
{
    return AWS.show_card_box(selector, type, time);
}

function invite_user(obj, img)
{
	return AWS.User.invite_user(obj, img);
}

function disinvite_user(obj)
{
    return AWS.User.disinvite_user(obj);
}

function add_dropdown_list(selector, data, selected)
{
    return AWS.Dropdown.set_dropdown_list(selector, data, selected);
}

function bind_dropdown_list(selector, type)
{
    return AWS.Dropdown.bind_dropdown_list(selector, type);
}

function get_dropdown_list(selector, type, data)
{
    return AWS.Dropdown.get_dropdown_list(selector, type, data);
}

function at_user_lists(selector) {
    return AWS.at_user_lists(selector);
}

function article_vote(element, article_id, rating)
{
	return AWS.User.article_vote(element, article_id, rating);
}

function comment_vote(element, comment_id, rating)
{
	return AWS.User.article_comment_vote(element, comment_id, rating);
}

$.extend(
    {
        //警告弹窗
        alert : function (text)
        {
            if ($('.alert-box').length)
            {
                $('.alert-box').remove();
            }

            $('#aw-ajax-box').append(Hogan.compile(AW_TEMPLATE.alertBox).render(
            {
                message: text
            }));

            $(".alert-box").modal('show');
        },

        /**
         *  公共弹窗
         *  alert       : 普通问题提示
         *  publish     : 发起
         *  shareOut    : 站外分享
         *  redirect    : 问题重定向
         *  imageBox    : 插入图片
         *  videoBox    : 插入视频
         *  linkbox     : 插入链接
         *  commentEdit : 评论编辑
         *  favorite    : 评论添加收藏
         *  inbox       : 私信
         *  report      : 举报问题
         */
        dialog : function (type, data)
        {
            switch (type)
            {
                case 'alertImg':
                    var template = Hogan.compile(AW_TEMPLATE.alertImg).render(
                    {
                        'hide': data.hide,
                        'url': data.url,
                        'message': data.message
                    });
                break;
            
                case 'publish':
                    var template = Hogan.compile(AW_TEMPLATE.publishBox).render(
                    {
                        'category_id': data.category_id,
                        'ask_user_id': data.ask_user_id
                    });
                break;
            
                case 'shareOut':
                    var template = Hogan.compile(AW_TEMPLATE.shareBox).render(
                    {
                        'items': AW_TEMPLATE.shareList
                    });
                break;
            
                case 'redirect':
                    var template = Hogan.compile(AW_TEMPLATE.questionRedirect).render(
                    {
                        'data_id': data
                    });
                break;
            
                case 'imageBox':
                    var template = Hogan.compile(AW_TEMPLATE.imagevideoBox).render(
                    {
                        'title': _t('插入图片'),
                        'url': 'imgsUrl',
                        'tips': 'imgsAlt',
                        'type': "'img'",
                        'upload' : ''
                    });
                break;
            
                case 'videoBox':
                    var template = Hogan.compile(AW_TEMPLATE.imagevideoBox).render(
                    {
                        'title': _t('插入视频'),
                        'url': 'videoUrl',
                        'tips': 'videoTitle',
                        'type_tips' : _t('我们目前支持: 优酷、酷六、土豆、56、新浪播客、乐视、Youtube 与 SWF 文件'),
                        'type': "'video'",
                        'upload' : 'hide'
                    });
                break;

                case 'linkbox':
                    var template = Hogan.compile(AW_TEMPLATE.linkBox).render(
                    {
                        'title': _t('插入链接'),
                        'text' : 'linkText',
                        'url'  : 'linkUrl',
                        'type' : "'link'"
                    });
                break;
            
                case 'commentEdit':
                    var template = Hogan.compile(AW_TEMPLATE.editCommentBox).render(
                    {
                        'answer_id': data.answer_id,
                        'attach_access_key': data.attach_access_key
                    });
                break;
            
                case 'favorite':
                    var template = Hogan.compile(AW_TEMPLATE.favoriteBox).render(
                    {
			            'item_id': data.item_id,
			            'item_type': data.item_type
                    });
                break;
            
                case 'inbox':
                    var template = Hogan.compile(AW_TEMPLATE.inbox).render(
                    {
                        'recipient': data
                    });
                break;
            
                case 'report':
                    var template = Hogan.compile(AW_TEMPLATE.reportBox).render(
                    {
                        'item_type': data.item_type,
                        'item_id': data.item_id
                    });
                break;
                    
                case 'topicEditHistory':
                    var template = AW_TEMPLATE.ajaxData.replace('{{title}}', _t('编辑记录')).replace('{{data}}', data);
                break;
                    
                case 'ajaxData':
                    var template = AW_TEMPLATE.ajaxData.replace('{{title}}', data.title).replace('{{data}}', '<div id="aw_dialog_ajax_data"></div>');
                break;
                    
                case 'imagePreview':
                    var template = AW_TEMPLATE.ajaxData.replace('{{title}}', _t('图片预览')).replace('{{data}}', '<p align="center"><img src="' + data.image + '" alt="" style="max-width:520px" /></p>');
                break;

                case 'confirm':
                    var template = Hogan.compile(AW_TEMPLATE.confirmBox).render(
                    {
                        'message': data.message
                    });
                break;
            }

            if (template)
            {
                if ($('.alert-box').length)
                {
                    $('.alert-box').remove();
                }

                $('#aw-ajax-box').html(template);

                switch (type)
                {
                    case 'redirect' : 
                        AWS.Dropdown.bind_dropdown_list($('.aw-question-redirect-box #question-input'), 'redirect');
                    break;

                    case 'inbox' :
                        AWS.Dropdown.bind_dropdown_list($('.aw-inbox #invite-input'), 'inbox');
                        //私信用户下拉点击事件
                        $(document).on('click','.aw-inbox .aw-dropdown-list li a',function() {
                            $('.alert-box #quick_publish input.form-control').val($(this).text());
                            $(this).parents('.aw-dropdown').hide();
                        });
                    break;

                    case 'publish':
                        AWS.Dropdown.bind_dropdown_list($('.aw-publish-box #quick_publish_question_content'), 'publish');
                        AWS.Dropdown.bind_dropdown_list($('.aw-publish-box #aw_edit_topic_title'), 'topic');
                        if (parseInt(data.category_enable) == 1)
                        {
                            $.get(G_BASE_URL + '/publish/ajax/fetch_question_category/', function (result)
                            {
                                AWS.Dropdown.set_dropdown_list('.aw-publish-box .dropdown', eval(result), data.category_id);
                
                                $('.aw-publish-title .dropdown li a').click(function ()
                                {
                                    $('.aw-publish-box #quick_publish_category_id').val($(this).attr('data-value'));
                                    $('.aw-publish-box #aw-topic-tags-select').html($(this).text());
                                });

                                $(".aw-publish-box .dropdown li a[data-value='" + data.category_id + "']").click();
                            });
                        }

                        if (data.ask_user_id != '' && data.ask_user_id != undefined)
                        {
                            $('.aw-publish-box .modal-title').html('向 ' + data.ask_user_name + ' 提问');
                        }
            
                        if ($('#aw-search-query').val() && $('#aw-search-query').val() != $('#aw-search-query').attr('placeholder'))
                        {
                            $('#quick_publish_question_content').val($('#aw-search-query').val());
                        }
            
                        AWS.Init.init_topic_edit_box('#quick_publish .aw-edit-topic');
                        
                        $('#quick_publish .aw-edit-topic').click();
            
                        if (data.topic_title)
                        {
                            $('#quick_publish .aw-edit-topic').parents('.aw-topic-editor').prepend('<a href="javascript:;" class="aw-topic-name"><span>' + data.topic_title + '</span><input type="hidden" value="' + data.topic_title + '" name="topics[]" /></a>')
                        }
                        
                        if (typeof(G_QUICK_PUBLISH_HUMAN_VALID) != 'undefined')
                        {
                            $('#quick_publish_captcha').show();
                            $('#captcha').click();
                        }
                        break;
                    break;

                    case 'shareIn':
                    case 'shareOut':
                        AWS.Dropdown.bind_dropdown_list($('.aw-share-box #invite-input'), 'inbox');
            
                        switch (data.item_type)
                        {
                            case 'question':
                            case 'answer':
                            case 'article':
                                var request_uri = G_BASE_URL + '/question/ajax/fetch_share_data/type-' + data.item_type + '__item_id-' + data.item_id;
                            break;
                        }
                        
                        $.get(request_uri, function (result)
                        {
                            $('#share_out_content').val(result.rsm.share_txt.message);
            
                            $('#bdshare').attr('data', '{text:\'' + result.rsm.share_txt.message.replace(' ' + result.rsm.share_txt.url, '') + '\', url:\'' + result.rsm.share_txt.url + '\', \'bdPic\': \'\'}');
                        }, 'json');
                        
                        break;
                    break;

                    case 'favorite':
                        $.get(G_BASE_URL + '/favorite/ajax/get_favorite_tags/', function (result)
                        {
                            if (result.length > 0)
                            {
                                $('#add_favorite_my_tags').show();
                            }
            
                            $.each(result, function (i, a)
                            {
                                $('#add_favorite_my_tags').append('<a href="javascript:;" onclick="$(\'#add_favorite_tags\').val($(\'#add_favorite_tags\').val() + \'' + a['title'] + ',\');" class="aw-topic-name"><span>' + a['title'] + '</span></a> ');
                            });
                        }, 'json');
                        break;
                    break;

                    case 'report':
                        $('.aw-report-box select option').click(function ()
                        {
                            $('.aw-report-box textarea').text($(this).attr('value'));
                        });
                        break;
                    break;

                    case 'commentEdit':
                        $.get(G_BASE_URL + '/question/ajax/fetch_answer_data/' + data.answer_id, function (result)
                        {
                            $('#editor_reply').html(result.answer_content.replace('&amp;', '&'));
                        }, 'json');
                        
                        AWS.Init.init_fileuploader('file_uploader_answer_edit', G_BASE_URL + '/publish/ajax/attach_upload/id-answer__attach_access_key-' + ATTACH_ACCESS_KEY);
                        
                        if ($("#file_uploader_answer_edit ._ajax_upload-list").length) {
                            $.post(G_BASE_URL + '/publish/ajax/answer_attach_edit_list/', 'answer_id=' + data.answer_id, function (data) {
                                if (data['err']) {
                                    return false;
                                } else {
                                    $.each(data['rsm']['attachs'], function (i, v) {
                                        _ajax_uploader_append_file('#file_uploader_answer_edit ._ajax_upload-list', v);
                                    });
                                }
                            }, 'json');
                        }
                        break;
                    break;

                    case 'ajaxData':
                        $.get(data.url, function (result) {
                            $('#aw_dialog_ajax_data').html(result);
                        });
                    break;
                }

                $(".alert-box").modal('show');
            }
        }

    });

