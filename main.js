var app = new Vue({
    el: "#app",
    data:{
        addr: "",
        name: "",
        suffix: "",
        width: "",
        height: "",
        start: 0,
        end: "",
        fps: "",
        code: "",
    },
    computed:{
        frametime: function(){
            return 1.0 / this.fps;
        },
    },
    methods:{
        update: function(){
            var maincode = "";
            var codestr_pre = "<svg opacity=\"0\" xmlns=\"http://www.w3.org/2000/svg\" viewbox=\"0 0 "+ this.width + " " + this.height + "\" width=\"100\%\" style=\"display: block; pointer-events: none; background-size: 100% auto; background-repeat: no-repeat; margin-bottom: 0px; max-width: none !important; transform: rotateZ(0deg); background-image: url(";
            var codestr_last = ");\">";
            var animstr_pre = "<animate attributeName=\"opacity\" values=\"1; 1; 0; 0;\" keyTimes=\"0; 0.010; 0.012; 1\" fill=\"freeze\" dur=\""+((this.end-this.start)*this.frametime).toFixed(2)+"s\" begin=";
            for(var i = this.start; i <= this.end; ++i)
                maincode += codestr_pre + "https://cdn.jsdelivr.net/gh/" + this.addr + "/" + this.name + (Array(5).join(0) + i).slice(-5) + this.suffix + codestr_last + "\n" + animstr_pre + (i*this.frametime).toFixed(2) +"s\"/>\n</svg>\n";
            this.code = maincode;            
        }
    },
});