import { useEffect, useState, useRef } from 'react'
import { SearchBar } from './SearchBar'
import { userService } from '../services/user.service'
import { MinUserCard } from './MinUserCard'
import { useNavigate } from 'react-router-dom'

export function SearchPopUp({ onClose }) {
    const [show, setShow] = useState('') // for slide effect
    const popupRef = useRef(null)
    const [result, setResult] = useState([])
    const [sResult, setSResult] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setShow('show')
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    async function onSerach(search) {
        setSResult(search)
        if (!search) return setResult([])
        const res = await userService.query({ username: search })
        setResult(res)
    }

    function handleClickOutside(event) {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShow('hide')
            setTimeout(() => {
                onClose(false)
            }, 300)
        }
    }

    const handleSelect = (user) => {
        navigate(`../profile/${user._id}`)
        onClose(false)
    };
    
    return (
        <div ref={popupRef} className={`search-pop-up ${show}`}>
            <h3>Search</h3>
            <SearchBar onSearch={onSerach} value={sResult} />
            {result.length > 0 && (
                <ul>
                    {result.map(user => (
                        <li key = {user._id} onClick={() => handleSelect(user)}>
                            <MinUserCard user={user} type={'both'} followButton={false} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
