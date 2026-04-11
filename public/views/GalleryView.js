let gallery_view = 
{
    path:[]
    ,
    views:[]
}
console.log('Iniciando carga');

async function start (params) 
{
    let r = await new FolderView().Render(`Gallery`);//PERFECT!
    
    gallery_view.paths = r;
    
    console.log('carga terminada');
    console.log(r); //Nice Nice NIce! NICE!!!

    let i = 0;

    r.forEach
    (
        p =>
        {
            gallery_view.views.push
            (
                new Vista('img').w //JAJAJA HAHAHAHAHAH KAKAKAKA!
                .set_attrs
                ({
                    src:`${p}`
                })
                .set_styles
                ({
                    width:'100%'
                    ,
                    margin:'0'
                    ,
                })
            )
            i++;    
        }
    )

    document.body.set_childrens
    ([
        new Vista('a').w
        .set_attrs
        ({
            onclick:
            `
                window.history.back()
            `
            ,
            //href:'/'
        })
        .set_childrens
        ([
            ' 戻る '
        ])
    ])

    document.body.set_childrens(gallery_view.views);

    document.body.set_childrens
    ([
        new Vista('a').w
        .set_attrs
        ({
            onclick:
            `
                window.history.back()
            `
            ,
            //href:'/'
        })
        .set_childrens
        ([
            ' 戻る '
        ])
    ])

    console.log('vista colocada');
}
start();