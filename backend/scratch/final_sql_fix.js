const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql'),
    path.join(__dirname, '..', 'amsh-backend-plesk-READY', 'AMSH_FIX_DATABASE.sql')
];

const psychiatryDeptSql = `
-- Psychiatry Department Additions
DELETE FROM departments WHERE id = 'cmppsych0001m02xzhmuegb1';
INSERT INTO departments (id, name, slug, description, image, icon, headName, headTitle, headProfession, headImage, categoryId, categoryName, vision, mission, goal, \`order\`, isActive, showOnHome, gallery, createdAt, updatedAt) VALUES ('cmppsych0001m02xzhmuegb1', 'Psychiatry Department', 'psychiatry', 'The centerpiece of AMSH, specializing in comprehensive mental health care, diagnostic psychiatry, and innovative therapeutic interventions.', 'https://api.amsh.gov.et/uploads/psychiatry-dept.png', '🧠', NULL, NULL, NULL, NULL, 'cmmds3hbt0001rlburs89vghr', 'Clinical Departments', NULL, NULL, NULL, 1, 1, 1, NULL, '2026-04-09 09:00:00', '2026-04-09 09:00:00');

DELETE FROM services WHERE departmentId = 'cmppsych0001m02xzhmuegb1';
INSERT INTO services (id, name, slug, description, content, image, icon, departmentId, headName, headTitle, headProfession, headImage, vision, mission, goal, highlights, \`order\`, isActive, showOnHome, gallery, createdAt, updatedAt) VALUES 
('cmpsvc10001m02xzhmuegb1', 'General Adult Psychiatry', 'adult-psychiatry', 'Comprehensive diagnosis and treatment for a wide range of mental health conditions in adults.', '<p>Providing evidence-based care including medication management and psychotherapy.</p>', NULL, '👥', 'cmppsych0001m02xzhmuegb1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, NULL, '2026-04-09 09:00:00', '2026-04-09 09:00:00'), 
('cmpsvc20001m02xzhmuegb1', 'Child & Adolescent Mental Health', 'child-psychiatry', 'Specialized mental health support for children and teenagers, focusing on developmental and emotional well-being.', '<p>Helping children overcome behavioral and emotional challenges in a supportive environment.</p>', NULL, '👶', 'cmppsych0001m02xzhmuegb1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 1, NULL, '2026-04-09 09:00:00', '2026-04-09 09:00:00'), 
('cmpsvc30001m02xzhmuegb1', 'Forensic Psychiatry Services', 'forensic-psychiatry', 'Professional psychiatric evaluation and treatment for individuals involved with the legal system.', '<p>Expert forensic assessments and rehabilitation services.</p>', NULL, '⚖️', 'cmppsych0001m02xzhmuegb1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 1, 1, NULL, '2026-04-09 09:00:00', '2026-04-09 09:00:00');
`;

files.forEach(file => {
    if (fs.existsSync(file)) {
        fs.appendFileSync(file, psychiatryDeptSql);
        console.log(`Appended psychiatry data to ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
