
const a = [[1, 2, 3], [1, 2]]

export default function Hello() {

    return (
        <>
            {a.map((b) => {
                return (
                    <>
                        {b.map((c) => {
                            return (
                                <>
                                    <h1>{c}</h1>
                                </>
                            )
                        })}
                    </>
                )
            })}
        </>
    )

}