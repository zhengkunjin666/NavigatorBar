// const PAGE={
//     data: {
//         navIdArr: ['section-1','section-2','section-3','section-4','section-5'],
//         navActiveId: '',
//         navSticky: false,
//         navOffset: 400,
//         navHeight: 60,
//     },
//     init: function(){
//         this.bind();
//     },
//     bind: function(){
//         window.addEventListener('scroll',this.refreshNav);
//         let nav=document.getElementById('nav');
//         this.onEventLister(nav,'click','nav-item',this.goNav);
//     },
//     onEventLister: function(parentNode,action,childClassName,callback){
//         parentNode.addEventListener(action,function(event){
//             event.target.className.indexOf(childClassName)>=0 && callback(event);
//         })
//     },
//     refreshNav: function(){
//         PAGE.stickyNav();
//         PAGE.heightLightNav();
//     },
//     stickyNav: function(){
//         let scrollTop=document.documentElement.scrollTop;
//         let navOffset=PAGE.data.navOffset;
//         navSticky= scrollTop>=navOffset;
//         if(PAGE.data.navSticky!==navSticky){
//             PAGE.data.navSticky=navSticky;
//             let nav=document.getElementById('nav');
//             if(navSticky){
//                 nav.className='nav sticky-top';
//             }else{
//                 nav.className='nav';
//             }
//         }
//     },
//     heightLightNav: function(){
//         let scrollTop=document.documentElement.scrollTop;
//         let filterNav=PAGE.data.navIdArr.filter(data => {
//             let offsetTop=document.getElementById(data).offsetTop
//             // return scrollTop>=offsetTop-PAGE.data.navHeight;
//             let offsetHeight=document.getElementById(data).offsetHeight
//             return scrollTop>=offsetTop-PAGE.data.navHeight && scrollTop<=offsetTop+offsetHeight-PAGE.data.navHeight
//         });
//         let navActiveId=filterNav.length ? filterNav[filterNav.length-1] : '';
//         if(PAGE.data.navActiveId!==navActiveId){
//             PAGE.data.navActiveId=navActiveId;
//             let navItems=document.getElementsByClassName('nav-item');
//             for(i=0;i<navItems.length;i++){
//                 let navItem=navItems[i];
//                 let navItemId=navItem.dataset.nav;
//                 if(navItemId==navActiveId){
//                     navItem.className='nav-item active';
//                 }else{
//                     navItem.className='nav-item';
//                 }
//             }
//         }
//     },
//     goNav: function(event){
//         let id=event.target.dataset.nav;
//         let offsetTop=document.getElementById(id).offsetTop-PAGE.data.navHeight;
//         document.documentElement.scrollTop=offsetTop;
//     }
// }
// PAGE.init();


const PAGE={
    data: {
        sectionIdArr: [$("#section-1"),$("#section-2"),$("#section-3"),$("#section-4"),$("#section-5")],
        navActiveId: '',
        navSticky: false,
        navOffsetTop: 400,
        navHeight: 60,
    },
    init: function(){
        this.bind();
        $(window).scroll(this.refreshNav);
    },
    bind: function(){
        $(".nav-item").live('click',this.goNav);
    },
    refreshNav: function(){
        PAGE.navSticky();
        PAGE.navHeightLight();
    },
    navSticky: function(){
        let scrollTop=$(window).scrollTop();
        let navOffsetTop=PAGE.data.navOffsetTop;
        if(scrollTop>=navOffsetTop){
            $(".nav").addClass("nav sticky-top");
        }
    },
    navHeightLight: function(){
        let scrollTop=$(window).scrollTop();
        let filterSection=PAGE.data.sectionIdArr.filter(data => {
            let offsetTop=data.offset().top;
            return scrollTop>=offsetTop-PAGE.data.navHeight && scrollTop<offsetTop+data.outerHeight()-PAGE.data.navHeight;
        });
        let navActiveId=filterSection.length ? filterSection[0].attr("id") : '';
        if(PAGE.data.navActiveId!==navActiveId){
            PAGE.data.navActiveId=navActiveId;
            let navItems=$(".nav-item");
            for(i=0;i<navItems.length;i++){
                let dataNav=navItems[i].dataset.nav;
                if(dataNav==navActiveId){
                    navItems[i].className='nav-item active';
                }else{
                    navItems[i].className='nav-item';
                }
            }
        }
    },
    goNav: function(event){
        let id=event.target.dataset.nav;
        let offsetTop=$("#"+id).offset().top-PAGE.data.navHeight;
        $(window).scrollTop(offsetTop);
    }
};
PAGE.init();