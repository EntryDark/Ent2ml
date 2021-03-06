import { Application, helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts"
const { getQuery } = helpers

const app = new Application

const getDefaultPic = async () => await fetch("https://playentry.org/img/assets/avatar_img.png")

app.use(async ctx => {
    try {
        const { id } = getQuery(ctx)
        const res = await fetch(`https://playentry.org/uploads/profile/${id.substring(0, 2)}/${id.substring(2, 4)}/avatar_${id}.png`)
            .then(async res => 
                (
                    res.ok 
                    ? res
                    : await getDefaultPic()
                ).arrayBuffer()
            )
        ctx.response.body = new Uint8Array(res)
        ctx.response.headers.set("Content-Type", "image/png")
    } catch (e) {
        ctx.response.body = e.toString()
    }
})

export default app.handle