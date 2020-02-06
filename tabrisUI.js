/*
      Tabris UI Modules is a Node Module for Tabris JS to improve Workflow and Reduce your delivery time
*/
const {
     device,
     ScrollView,
     ImageView,
     TextView,
     Composite,
     TabFolder,
     Tab,
     NavigationView,
     Page
} = require('tabris');



//Top Nitification
class tNotification extends Composite {

     constructor(properties) {

          super(Object.assign({
               left: 0,
               right: 0,
               top: 0,
               padding: 15,
               elevation: 1100000,
               // opacity: 0,
               transform: {
                    translationY: -100
               }
          }, properties));


          this.onTap(() => {
               this.close();
          });

          this._fixingUI();

          this.appendTo(tabris.contentView);
     }

     //UI
     _fixingUI() {

          new TextView({
               left: 10,
               right: 40,
               font: this.font,
               textColor: '#FFF',
               id: "shNotification_message",
               text: "",
               top: 0,
               maxLines : 3
          }).appendTo(this);

          new ImageView({
                    right: 0,
                    width: 13,
                    height: 13,
                    centerY: 0,
                    image: 'dist/images/close.png',
                    tintColor: '#FFF'
               })
               .on('tap', () => {
                    this.close()
               })
               .appendTo(this);
     }


     //Show Message
     pop(data) {
          this._children('#shNotification_message').set({
               text: data.message
          })

          this.theme = data.theme;

          // this._children('#shNotification_message').text = data.message;
          this.animate({
               transform: {
                    translationY: 0
               }
          }, {
               duration: 300,
               easing: 'linear'
          });
     }

     //Close Message
     close() {
          this.animate({
               transform: {
                    translationY: -100
               }
          }, {
               duration: 300,
               easing: 'linear'
          });
     }


     // action(data: any) {
     //       let action = data.action;
     //       // var interval;

     //       if (action == 'show') {

     //             // this._children('#shNotification_message').text = data.message;

     //             this.theme = data.theme;

     //             this.animate({
     //                   opacity: 1
     //             }, {
     //                   duration: 300,
     //                   easing: 'linear'
     //             });

     //             setTimeout(() => {
     //                   // clearMessage();
     //                   // console.log('Muss');
     //             }, 1500)


     //       } else if (action == 'hide') {

     //       }

     //       // function clearMessage(this) {
     //       //       this.animate({
     //       //             opacity: 0
     //       //       }, {
     //       //             duration: 300,
     //       //             easing: 'linear'
     //       //       });
     //       //       // clearTimeout(interval);
     //       // }
     // }

     //Setters
     set theme(th) {

          switch (th) {
               case 'warning':
                    this.background = '#F60';
                    break;

               case 'success':
                    this.background = '#060';
                    break;

               case 'error':
                    this.background = '#C00';
                    break;

               default:
                    this.background = '#404040';
                    break;
          }
     }

     set message(m) {
          this._children('#shNotification_message').text = m;
          // console.log(m);
     }
}

//Floating Box
class tFloatBox extends ScrollView {

     constructor(properties) {

          super(properties);

          this.left = 0;
          this.right = 0;
          this.top = 0;
          this.bottom = 0;
          this.elevation = 0;
          this.elevation = 1000000;
          this.visible = false;

          this._addUI();
     }

     _addUI() {
          new Composite({
               opacity: 0.7,
               background: '#036',
               left: 0,
               right: 0,
               top: 0,
               bottom: 0,
               id: "shade",
               // visible : false
          })
          .on('tap', () => {
               // this.slideOut();
          })
          .appendTo(this)

          let panel = new Composite({
               // left : 15,
               // right : 15,
               // bottom: 15,
               left: 0,
               right: 0,
               bottom: 0,
               // height : 300,
               background: '#FFF',
               // cornerRadius : 3,
               id: "panel",
               transform: {
                    translationY: 250
               }
          }).appendTo(this);

          let titlePanel = new Composite({
               left: 0,
               right: 0,
               top: 0,
               padding: 15,
               id: "titlePanel"
               // background : '#FC0'
          }).appendTo(panel)

          new ImageView({
                    right: 10,
                    top: 10,
                    width: 26,
                    height: 26,
                    image: '/src/images/close.png',
                    // tintColor: '#333',
                    // background : '#FC0',
                    padding: 5,
               })
               .on('tap', () => {
                    this.slideOut();
               })
               .appendTo(panel);

          new TextView({
               left: 0,
               right: 15,
               // background : '#900',
               id: "title",
               top: 0,
               font: this.titleFont,
          }).appendTo(titlePanel);

          new Composite({
               height: 1,
               left: 10,
               right: 10,
               background: '#DDD',
               id: 'panelLine',
               // top: ['#panel', 0]
               top: 50
          }).appendTo(panel);

          new Composite({
               top: 42,
               left: 0,
               right: 0,
               padding: 10,
               id: "appContainer"
          }).appendTo(panel)
     }

     slideIn(data) {
          //Show or Hide Title
          if ("title" in data) {
               //Title
               this._find('#title').set({
                    text: data.title.toUpperCase(),
                    alignment : this.titleAlign
               });
          } else {
               this._find('#titlePanel')[0].visible = false;
               this._find('#panelLine')[0].visible = false;
          }

          if ("append" in data) {
               let appContainer = this._find('#appContainer');
               data.append.appendTo(appContainer)
          } else {
               // return false;
          }


          this.visible = true;

          this._children('#shade').animate({
               opacity: 0.7
          }, {
               duration: 100
          })


          this._children('#panel').animate({
               transform: {
                    translationY: 0
               }
          }, {
               duration: 100,
               delay: 100
          })
     }

     slideOut() {

          //Show the modal
          this._children('#panel').animate({
               transform: {
                    translationY: 250
               }
          }, {
               duration: 100,
               easing: 'linear'
               // duration: 100,
               // reverse: false,
          });

          this._children('#shade').animate({
               opacity: 0
          }, {
               duration: 150,
               delay: 100
          });

          setTimeout(() => {
               this.visible = false;
          }, 290)
     }

}

// carosel Sldier
class tCaroselSlider extends Composite {

     constructor(properties) {
          super(properties);

          this._addUI();
     }

     _addUI() {

          let sliderPanel = new TabFolder({
               left: 0,
               right: 0,
               top: 0,
               bottom: 0,
               id: 'sliderPanel',
               tabBarLocation: "hidden",
               paging: true,
               tabMode: 'scrollable'
          }).appendTo(this)

     }

     createSlider(data) {

          if (data.hasOwnProperty('slides')) {

               let cnt = 0;

               let indicatorPanel = new Composite({
                    bottom: 30,
                    padding: 5,
                    // background : '#FFF',
                    id: "indicatorPanel",
                    centerX: 0
               }).appendTo(this);

               let slidesLenght = 12 * data.slides.length;
               indicatorPanel.width = (slidesLenght + 10);

               let sliderPanel = this._find('#sliderPanel');

               data.slides.forEach((slide, index) => {

                    //Add Slides
                    new Composite({
                         height: 7,
                         width: 7,
                         cornerRadius: 20,
                         background: '#FFF',
                         left: (12 * index),
                         id: `indicator_${index}`,
                         class: `indicators`,
                         opacity : 0.8
                    }).appendTo(indicatorPanel);

                    //Add Slides
                    new Tab({
                              left: 0,
                              right: 0,
                              top: 0,
                              bottom: 0,
                              // padding: 30,
                              id: `tab_${index}`,
                         })
                         .append(
                              slide
                              // new ImageView({
                              //      centerY: -150,
                              //      left: 0,
                              //      right: 0,
                              //      image: ``
                              // }),
                              // new TextView({
                              //      centerY: 0,
                              //      left: 0,
                              //      right: 0,
                              //      text: index,
                              //      alignment: 'centerX',
                              //      font: "16px OpenSansBold",
                              //      // id: id,
                              //      textColor: '#FC0'
                              // }),
                              // new TextView({
                              //      // top: ['#' + id, 20],
                              //      left: 0,
                              //      right: 0,
                              //      text: index,
                              //      alignment: 'centerX',
                              //      font: "14px QuicksandMed",
                              //      textColor: "#333"
                              // })
                         )
                         .appendTo(sliderPanel);

               });


               //Indicator
               this._find(`#indicator_0`).set({
                    background: '#222'
               });


               sliderPanel.on('selectionIndexChanged', e => {
                    let id = e.value;
                    let elm = this._find(`#indicator_${id}`);

                    cnt = id;


                    this._find(`.indicators`).set({
                         background: '#CCC'
                    });

                    elm.set({
                         background: '#222'
                    })
               })

               //AutoPlay
               if (data.hasOwnProperty('autoPlay') && data.autoPlay == true) {

                    setInterval(() => {

                         sliderPanel.set({
                              selectionIndex: cnt
                         })

                         cnt = cnt + 1;
                         if (cnt === (data.slides.length)) {
                              cnt = 0;
                         }

                    }, data.interval);
               }


          } else {
               console.log('Slider has no slides');
          }


     }

}

// Custom TabFolder and Its tabs
class tTabFolder extends Composite {
     constructor(properties) {

          super(properties);

          this._addUI();
     }

     _addUI() {

          //Page Viewer
          let navView = new Composite({
               left: 0,
               right: 0,
               top: 0,
               bottom: 61,
               id: 'tUINavView',
               background : '#FFF'
          }).appendTo(this)

          let line = new Composite({
               left: 0,
               right: 0,
               height: 1,
               bottom: 61,
               background: '#EEE'
          }).appendTo(this)

          let tabsBox = new Composite({
               left: 0,
               right: 0,
               bottom: 0,
               height: 60,
               id: 'tabsBox'
          }).appendTo(this)
     }

     //Create Tabs
     createTabs(data) {
          //Customize NavView
          let navView = this._find('#tUINavView');
          let navViewInfo = data.tabHolder;

          // console.log(navViewInfo);
          // navView.set({
          //      toolbarVisible: navViewInfo.showNav
          // });


          //   console.log(tabsBox);
          let tabsBox = this._find('#tabsBox');

          let tabs = data.tabs;

          let width = tabris.device.screenWidth;
          width = width / tabs.length;



          //Create Tabs
          for (let key in tabs) {

               let tab = new Composite({
                    id: tabs[key].name,
                    width: width,
                    top: 0,
                    bottom: 0,
                    left: (key * width),
                    highlightOnTouch: true,
                    class: `${data.name}-tUITab`
                    //   background : '#090'
               }).appendTo(tabsBox);

               new ImageView({
                    centerX: 0,
                    top: 5,
                    image: tabs[key].image,
                    height: 28,
                    width: 28
               }).appendTo(tab);

               //Check and Set Theme Font
               let themefont = '';
               if(!data.hasOwnProperty('themeFont') || data.themeFont === ''){
                    themefont = '10px Arial';
               }else{
                    themefont = data.themeFont;
               }

               new TextView({
                    left: 0,
                    right: 0,
                    text: tabs[key].title,
                    alignment: 'centerX',
                    font: themefont,
                    padding: 5,
                    top: 33
               }).appendTo(tab);

               // Create Page
               new Composite({
                    left : 0,
                    right : 0,
                    top : 0,
                    bottom : 0,
                    class : `${data.name}-tTabPage`,
                    id : `${data.name}-${tabs[key].name}tTabPage`,
                    // background : '#0CC',
                    transform : {
                         translationX : -device.screenWidth
                    },
                    opacity : 0,
                    // autoDispose : false
               })
               .on('tap', elm => {
                    console.log(elm);
               })
               .appendTo(navView);



               tab.on('tap', elm => {
                    let text = elm.target._find(TextView);
                    let icon = elm.target._find(ImageView);

                    let allTabs = $(`.${data.name}-tUITab`);

                    for(let i = 0; i < allTabs.length; i++){
                         allTabs[i]._find(ImageView).set({
                              tintColor : '#222'
                         });
                         allTabs[i]._find(TextView).set({
                              textColor : '#222'
                         })
                    }

                    text.set({ textColor : data.themeColor });
                    icon.set({ tintColor : data.themeColor });

                    //Move All Pages and Show Current Page
                    let allTabPages = $(`.${data.name}-tTabPage`);
                    for(let i = 0; i < allTabs.length; i++){
                         allTabPages[i].animate(
                              {
                                   transform : {
                                        translationX : -device.screenWidth
                                   },
                                   opacity : 0
                              },
                              {
                                   duration : 100
                              }
                         )

                         // console.log(allTabPages[i]);
                         allTabPages[i].disappear;
                         // console.log(allTabPages[i].disappear);
                    }

                    // console.log(tabris.ui);
                    // console.log(tabris.ui._find(`#${data.name}-${tabs[key].name}tTabPage`));
                    // $(`#${data.name}-${tabs[key].name}tTabPage`).appendTo(navView);
                    // console.log(tabris);
                    // console.log($(`#${data.name}-${tabs[key].name}tTabPage`));
                    $(`#${data.name}-${tabs[key].name}tTabPage`).appear;
                    $(`#${data.name}-${tabs[key].name}tTabPage`).animate(
                         {
                              transform : {
                                   translationX : 0
                              },
                              opacity : 1
                         },
                         {
                              duration : 100
                         }
                    );

                    // console.log();
                    // $('#tUINavView')[0].pages()[0].appear;
                    // console.log($('#tUINavView')[0].pages()[0]);
                    // window[elm.target.id + 'Page']();
               })

          }


          //Set Defaults
          $(`.${data.name}-tUITab`)[data.defaultTab]._find(TextView).set({ textColor : data.themeColor });
          $(`.${data.name}-tUITab`)[data.defaultTab]._find(ImageView).set({ tintColor : data.themeColor });

          $(`.${data.name}-tTabPage`)[data.defaultTab].set({
               transform : {
                    translationX : 0
               },
               opacity : 1
          });

     }
}

//Icon Button
class tIconButton extends Composite {
     constructor(properties){
          super(properties);
          this.highlightOnTouch = true;

          this._addUI(properties);

     }

     // set spacePad(){
     //
     // }
     // get spacePad(){
     //
     // }

     _addUI(props) {
          // console.log(props);
          new ImageView({
               top : 0,
               left : 0,
               right : 0,
               bottom : props.spacePad,
               image : props.image,
               tintColor : props.tintColor,
          }).appendTo(this);
          //
          new TextView({
               left : 0,
               right : 0,
               bottom : 0,
               alignment : 'centerX',
               font : props.font,
               textColor : props.textColor,
               text : props.text
          }).appendTo(this);

     }

}

//Titled Button
class tTitleButton extends Composite {

     constructor(properties){
          super(properties);
          let id = `${new Date().getTime()}_tTitleButton_title`;
          console.log(id);
          console.log(`#${id}`);

          new TextView({
               top : 0,
               left : 0,
               right : 0,
               // bottom : properties.spacePad,
               alignment : properties.titleAlignment,
               font : properties.titleFont,
               textColor : properties.titleColor,
               text : properties.titleText,
               id : id
          }).appendTo(this);
          // console.log(this._find(`#${id}`)[0]);
          new TextView({
               left : 0,
               right : 0,
               // top : [this._find(`#${id}`)[0], properties.spacePad],
               top : [`#${id}`, properties.spacePad],
               alignment : properties.smallAlignment,
               font : properties.smallFont,
               textColor : properties.smallColor,
               text : properties.smallText,
               // background : '#090'
          }).appendTo(this);
     }

}

//Titled Button
class tLineTitle extends Composite {
     constructor(properties){
          super(properties);

          let id = `${new Date().getTime()}_tLineTitle_title`;

          new TextView({
               left : 0,
               right : 0,
               alignment : properties.textAlignment,
               font : properties.font,
               textColor : properties.fontColor,
               text : properties.text,
               id : id
               // background : '#090'
          }).appendTo(this);

          new Composite({
               left : 0,
               right : 0,
               top : [this._find(`#${id}`)[0], properties.spacePad],
               height : 1,
               background : properties.lineColor
          }).appendTo(this);

     }
}

//This module is used to Manage different notifications
module.exports = {
     tFloatBox,
     tCaroselSlider,
     tNotification,
     tTabFolder,
     tIconButton,
     tTitleButton,
     tLineTitle
};
