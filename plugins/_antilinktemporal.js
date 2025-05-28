let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let linkRegex1 = /whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { conn, isAdmin, isOwner, isROwner, participants }) {
if (!m.isGroup) return 
if (isAdmin || isOwner || m.fromMe || isROwner) return

let chat = global.db.data.chats[m.chat];
let delet = m.key.participant;
let bang = m.key.id;
const user = `@${m.sender.split`@`[0]}`;
const groupAdmins = participants.filter(p => p.admin);
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');
let bot = global.db.data.settings[this.user.jid] || {};
const isGroupLink = linkRegex.exec(m.text) || linkRegex1.exec(m.text);
const grupo = `https://chat.whatsapp.com`;
if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply('🚩 El antilink está activo pero te salvaste por ser adm.');
if (chat.antiLink && isGroupLink && !isAdmin) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
return !0;
} // else if (!bot.restrict) {
// return m.reply('☁️ ¡Esta característica está deshabilitada!');
// }
return !0;
}
