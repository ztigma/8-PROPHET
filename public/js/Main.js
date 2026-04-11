class Main extends Vista
{
    constructor(tag)
    {
        super(tag);
        on_start.push(this);

        this.w.set_styles
        ({
            height:'80vh'
        })

        let titulo = new Vista().w
        .set_childrens(['８人の預言者 / 8 PROPHET'])
        .set_styles
        ({
            "font-size":'4vw'
            ,
            "font-weight":'bold'
        })

        let galeria = new Vista('a').w
        .set_childrens(['ギャラリー (ここをタップして作品をすべて見る！)'])
        .set_attrs
        ({
            href:'public/views/Gallery.html'
        })
        .set_styles
        ({
            color:'white'
        })
        ;
        let obra_1 = new Vista().w
        .set_childrens(['各話リスト :'])
        .set_styles
        ({
            "font-size":'3vw'
            ,
            "font-weight":'bold'
        })
        ;
        
        let ruta_unica = `public/views/Chapters/chapters.html`;

        let ch1 = new Vista('a')
        .w.set_childrens(['第０話'])
        .set_attrs
        ({
            href:`${ruta_unica}?ch=1`
        })
        .set_styles
        ({
            color:'white'
        })
        ;

        var ch2 = new Vista('a').w
        .set_childrens(['第１話'])
        .set_attrs
        ({
            href:`${ruta_unica}?ch=2`
        })
        .set_styles
        ({
            color:'white'
        })
        ;

        this.w.set_childrens
        ([
            titulo
            ,
            galeria
            ,
            obra_1
            ,
            ch1 //automatizar
            ,
            ch2
        ])
    }
    OnStart ()
    {
        console.log("start");

        document.body.SetImg(`public/img/27.jpg`)

        document.body.set_childrens
        ([
            this.w
        ])
    }
}
new Main(); //PALM FACE!!!
/**
 
set_attrs
set_styles
remove_styles
set_childrens
SetImg
 */