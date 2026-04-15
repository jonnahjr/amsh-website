const fs = require('fs');
const path = require('path');

const mappings = {
    // Departments
    "'=ƒ¬¦'": "'🩺'",
    "'=ƒö¼'": "'🧠'",
    "'=ƒ¬+'": "'☢️'",
    "'=ƒº¬'": "'🔬'",
    "'=ƒÆè'": "'💊'",
    "'GÜÖn+Å'": "'⚙️'",
    "'=ƒÜæ'": "'🚨'",
    "'G¥ñn+ÅGÇì=ƒöÑ'": "'🏥'",
    "'=ƒÅÑ'": "'🛌'",
    "'=ƒæ¬GÇìGÜòn+Å'": "'👩‍⚕️'",
    "'=ƒöä'": "'🦾'",
    "'=ƒñ¥'": "'🤝'",
    "'=ƒôï'": "'🛡️'",
    "'=ƒôü'": "'📋'",
    "'=ƒôP'": "'📞'",
    "'=ƒÆ+'": "'💻'",
    "'=ƒÄô'": "'🎓'",
    "'G¡É'": "'✨'",
    
    // Services
    "'=ƒæ¦'": "'🩺'",
    "'=ƒôè'": "'📝'",
    "'=ƒÜ¿'": "'🚑'",
    "'=ƒºá'": "'🧠'",
    "'=ƒÄùn+Å'": "'🎗️'",
    "'=ƒôí'": "'📱'",
    "'=ƒôÜ'": "'📚'",
    "'=ƒôé'": "'📂'",
    "'=ƒöù'": "'🔗'",
    "'=ƒææ'": "'👁️'",
    
    // The specific one the user saw
    "'≡ƒ⌐║'": "'🏥'",
    "'=ƒ⌐║'": "'🏥'",
    "'=ƒ⌐¦'": "'🏥'"
};

const sqlFiles = [
    path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql'),
    path.join(__dirname, '..', 'amsh-backend-plesk-READY', 'AMSH_FIX_DATABASE.sql')
];

sqlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let totalReplaced = 0;
        for (const [garbled, emoji] of Object.entries(mappings)) {
            if (content.includes(garbled)) {
                const count = content.split(garbled).length - 1;
                content = content.split(garbled).join(emoji);
                totalReplaced += count;
            }
        }
        fs.writeFileSync(file, content);
        console.log(`Fixed ${totalReplaced} occurrences in ${file}`);
    }
});
