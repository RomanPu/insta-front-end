import React, { useRef, useState, useEffect } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export function EmojiPicker({ onSelect, showEmojiPicker, setShowEmojiPicker }) {
	const emojiPickerRef = useRef(null)
	const [emojiPickerPosition, setEmojiPickerPosition] = useState('down')

	useEffect(() => {
		if (showEmojiPicker && emojiPickerRef.current) {
			const emojiPickerRect =
				emojiPickerRef.current.getBoundingClientRect()
			const spaceAbove = emojiPickerRect.top
			const spaceBelow = window.innerHeight - emojiPickerRect.bottom

			if (spaceAbove > spaceBelow) {
				setEmojiPickerPosition('up')
			} else {
				setEmojiPickerPosition('down')
			}
		}

		if (showEmojiPicker) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showEmojiPicker])

	const handleClickOutside = event => {
		console.log('event', event.target)
		if (
			emojiPickerRef.current &&
			!emojiPickerRef.current.contains(event.target)
		) {
			setShowEmojiPicker(false)
		}
	}

	useEffect(() => {
		if (showEmojiPicker) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showEmojiPicker])

	return (
		showEmojiPicker && (
			<div
				ref={emojiPickerRef}
				className={`emoji-picker ${emojiPickerPosition}`}
			>
				<Picker data={data} onEmojiSelect={onSelect} />
			</div>
		)
	)
}

export function EmojiIcon() {
	return (
		<svg
			aria-label="Emoji"
			className="x1lliihq x1n2onr6 x1roi4f4"
			fill="currentColor"
			height="13"
			role="img"
			viewBox="0 0 24 24"
			width="13"
		>
			<title>Emoji</title>
			<path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
		</svg>
	)
}
