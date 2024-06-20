import React from 'react'

const LatexHint = () => {
    return (<div className='w-full col-span-2'>
        <h2 className="text-center underline text-2xl p-2">Latex Guideline</h2>
        <iframe className='w-full overflow-hidden rounded-lg' src="https://katex.org/docs/support_table" height={500} >
        </iframe>
    </div>)
}
export default LatexHint;
