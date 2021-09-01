import { Component, OnInit } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';  
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
declare var $ :any;

var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'ThienAnBOT', //name of the chatbot
  talking = true; //when false the speach function doesn't work
function chatbotResponse() {
  talking = true;
  botMessage = "Bạn cần nhập đúng lựa chọn !"; //the default message
  if (lastUserMessage === '1' || lastUserMessage.toLowerCase() =='mot') {
    const sdt = ['Điện thoại hỗ trợ: ','024 7308 3232 lẻ (102, 103, 104, 105)','Email tiếp nhận yêu cầu:','hotro@thienan.vn']
    botMessage =  sdt[0] + "<br>" + 
                  "<a href='tel:024 7308 3232'>"+sdt[1]+"</a>"+"<br>"+
                  sdt[2] + "<br>"+ 
                  "<a href='#' style='pointer-events: none;'>"+sdt[3]+"</a>";
  }
  if (lastUserMessage === '2' || lastUserMessage.toLowerCase() =='hai') {
    const dc = ['273, Nguyễn Trãi, Thanh Xuân, Hà Nội']
    botMessage = "<p style='color:blue;'>"+dc[0]+"</p>";
  }
  if (lastUserMessage === '3' || lastUserMessage.toLowerCase() =='ba') {
    const linkGT = ['http://thienan.vn/']
    botMessage = linkGT[0];
  }
  if (lastUserMessage === '4' || lastUserMessage.toLowerCase() =='bon') {
    const linkHD = ['http://thienan.vn/chitiet/video-huong-dan-su-dung-phan-mem/huong-dan-su-dung-phan-mem-quan-ly-dao-tao-phan-he-quan-ly-sinh-vien']
    botMessage = linkHD[0];
  }
  if (lastUserMessage === '5' || lastUserMessage.toLowerCase() =='nam') {
    const linkGT = ['Angular, .NET framework MVC, SQL Server']
    botMessage = "<p style='color:blue;'>"+linkGT[0]+"</p>";
  }
  if (lastUserMessage === 'name') {
    botMessage = 'My name is ' + botName;
  }
}
//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    // newEntry();
  }
  if (key == 38) {
     
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit, AfterViewInit {

  Token: any

  public com: common;
  UserName_get: any;
  FullName_get: any;
  form = new FormGroup({
    myInput: new FormControl('')
  });

  constructor(
    public router: Router,
    private titleService: Title,
    private http: HttpClient,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.UserName_get = a.Info.UserName;
    this.FullName_get = a.Info.FullName;
    this.Token = a.Token;
  }
  clickComment() {
    $('.chatbox-popup').fadeToggle();
  }
  closePopUp() {
    $('.chatbox-popup').fadeOut();
  }
  zoomOutPopUp() { 
    $('.chatbox-popup__main').css('height','50vh');
    $('.chatbox-zoomOut').css('display','none');
    $('.chatbox-zoomIn').css('display','block');
  }
  zoomInPopUp() { 
    $('.chatbox-popup__main').css('height','300px');
    $('.chatbox-zoomOut').css('display','block');
    $('.chatbox-zoomIn').css('display','none');
  }
  ngAfterViewInit() {
    setTimeout(() => {
      var elem = this.renderer.selectRootElement('#chatbox');
      elem.focus();

    }, 1000);
  }

  focusMyInput() {    
    var ampm = new Date().getHours() >= 12 ? 'pm' : 'am';
    var strTime = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds()+" "+ ampm;
    this.renderer.selectRootElement('#chatbox').focus();
    if (this.form.value.myInput != "") {
      lastUserMessage = this.xoa_dau(this.form.value.myInput.toLowerCase());
      this.form.value.myInput = "";
      messages.push('   <div  > '+
      ' <div class="direct-chat-msg">' +
        ' <div class="direct-chat-infos clearfix">'+
          '<span class="direct-chat-name float-left">'+this.UserName_get+'</span>'+
          ' <span class="direct-chat-timestamp float-right">'+ strTime +'</span>'+
         '</div>'+
        ' <img class="direct-chat-img" src="assets/img/logoUser.png" alt="Message User Image">' +
         '<div class="direct-chat-text">'+
         lastUserMessage +
         '</div>'+
      ' </div>');
      chatbotResponse();
      if (lastUserMessage == "3" || lastUserMessage == "ba" || lastUserMessage == "4" || lastUserMessage == "bon") {

        messages.push(
          ' <div class="direct-chat-msg right">' +
            ' <div class="direct-chat-infos clearfix">' +
               '<span class="direct-chat-name float-right">' + botName +'</span>' +
               '<span class="direct-chat-timestamp float-left">' + strTime +'</span>'+
            ' </div>'+
            ' <img class="direct-chat-img" src="assets/img/logoChatBot.png" alt="Message User Image">'+
            ' <div class="direct-chat-text">'+
            "<a href = '"+botMessage+"' target='_blank'>"+botMessage+"</a>"+
            ' </div>'+
           '</div>'+
             '</div>')
      }  
      else {
        // messages.push("<b>" + botName + ":</b> " + botMessage);
        messages.push(
       ' <div class="direct-chat-msg right">' +
         ' <div class="direct-chat-infos clearfix">' +
            '<span class="direct-chat-name float-right">' + botName +'</span>' +
            '<span class="direct-chat-timestamp float-left">' + 
            strTime +'</span>'+
         ' </div>'+
         ' <img class="direct-chat-img" src="assets/img/logoChatBot.png" alt="Message User Image">'+
         ' <div class="direct-chat-text">'+
         botMessage+
         ' </div>'+
        '</div>'+
          '</div>')
      } 
      for (var i = 1; i < 8; i++) {
        if (messages[messages.length - i])
          document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
      }
      $('.chatbox-popup__main').scrollTop($('.chatbox-popup__main')[0].scrollHeight);
      
    }
    this.form.reset();
  }

  xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
    return str;
  }
}
