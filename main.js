var app = new Vue({
    el: "#app",
    data:{
        addr: "",
        name: "",
        suffix: "",
        width: "",
        height: "",
        zeroholder: 5,
        start: 0,
        end: "",
        fps: "",
        code: "",
    },
    computed:{
        frametime: function(){
            return 1.0 / this.fps;
        },
        viewbox: function(){
            return "viewbox=\"0 0 "+ this.width + " " + this.height + "\"";
        },
        zholder: function(){
            if(this.zeroholder=="") return 5;
            return parseInt(this.zeroholder);
        },
        keyTimes: function(){
            return "keyTimes=\"0; " + (this.frametime+0.004).toFixed(3) + "; "+ (this.frametime + 0.006).toFixed(3) + "; 1\"";
        },
        filename: function(){
            return this.name + (Array(this.zholder).join(0) + 0).slice(-this.zholder) + this.suffix;
        },
        totalTime: function(){
            return ((parseInt(this.end)-parseInt(this.start))*this.frametime).toFixed(3);
        },
    },
    methods:{
        update: function(){
            var maincode = "<section class=\"frameSVG\">\n";
            var codestr_pre = "<p style=\"height:0 !important;display: block;\">\n<svg opacity=\"0\" xmlns=\"http://www.w3.org/2000/svg\"  width=\"100\%\" " + this.viewbox + " style=\"display: block; pointer-events: none; background-size: 100% auto; background-repeat: no-repeat; margin-bottom: 0px; max-width: none !important; transform: rotateZ(0deg); background-image: url(";
            var codestr_last = ");\">";
            var animstr_pre = "<animate attributeName=\"opacity\" values=\"1; 1; 0; 0;\" " + this.keyTimes + " fill=\"freeze\" dur=\""+ this.totalTime +"s\" begin=\"";
            var animstr_pref = "<animate attributeName=\"opacity\" values=\"1; 1; 1; 1;\" " + this.keyTimes + " fill=\"freeze\" dur=\""+ this.totalTime +"s\" begin=\"";
            for(var i = parseInt(this.start); i <= parseInt(this.end); ++i)
                maincode += codestr_pre + "https://cdn.jsdelivr.net/gh/" + this.addr + "/" + this.name + (Array(this.zholder).join(0) + i).slice(-this.zholder) + this.suffix + codestr_last + "\n" + (i==parseInt(this.end)?animstr_pref : animstr_pre) + (i*this.frametime).toFixed(3) +"s\"/>\n</svg>\n</p>\n";
            maincode += "</section>\n";
            this.code = maincode;
            if (this.fps!="")
                document.getElementById('preview').innerHTML = maincode;          
        },
        btnExample: function(){
            this.addr = "SJTU-Art-Center/frameSVG@main/storage/circle";
            this.name = "circle";
            this.suffix = ".png";
            this.width = "300";
            this.height = "300";
            this.zeroholder = 5;
            this.start = 0;
            this.end = 29;
            this.fps = "30";
            this.update();
        },
    },
});