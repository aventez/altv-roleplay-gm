import md5 from 'md5';

export function encrypt(message) {
	return md5(message);
}

export function verify(message, hash) {
	if(md5(message) === hash) return true;
	return false;
}