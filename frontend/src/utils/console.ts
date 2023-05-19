const DEFAULT_STYLE = "background: #3c3c3c; padding: 4px 6px; border-radius: 3px; font-weight: bold;margin-right: 3px";
const NETWORK_STYLE = "background: #6B5EB1; padding: 4px 6px; border-radius: 3px; font-weight: bold;margin-right: 3px; margin-top: 2px";

export function log(message: string) {
    console.log(`%c${message}`, DEFAULT_STYLE);
}

export function logNetwork(msg: string, chainId: string | number) {
    console.log(`%c${msg}%c${chainId}`, DEFAULT_STYLE, NETWORK_STYLE);
}