import { useState } from 'react'
 
function useCopyToClipboard() {
    const [copiedText, setCopiedText] = useState('')
    const [isCopied, setIsCopied] = useState(false)
    const copyFn = async text => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported')
            return false
        }
        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            console.log('copiedText: ', text)
            setIsCopied(true)
            return true
        } catch (error) {
            console.warn('Copy failed', error)
            setCopiedText(null)
            setIsCopied(false)
            return false
        }
    }
 
    return [isCopied, copyFn, setIsCopied, copiedText]
}
 
export default useCopyToClipboard