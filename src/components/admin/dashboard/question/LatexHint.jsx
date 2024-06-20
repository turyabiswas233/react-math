import React from 'react'

const LatexHint = () => {
    return (<div className='flex-1'>
        <h2 className="text-center">Latex Guideline</h2>
        <iframe className='w-full overflow-hidden rounded-lg' src="https://katex.org/docs/support_table" height={500} >
        </iframe>
    </div>)
}
export default LatexHint;
