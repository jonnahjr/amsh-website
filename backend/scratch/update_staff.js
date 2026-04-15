const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const staffKey = 'staff_directory';
  const setting = await prisma.siteSetting.findUnique({
    where: { key: staffKey }
  });

  const exactStaff = [
    { id: 'zegeye', name: "Mr. Zegeye Yohannis", role: "CPD, Clinical Training and Research Director", phone: "+251 91 330 7290", image: "/assets/research/mr_zegeye_yohannis_headshot_1775135176650.png" },
    { id: 'habtamu', name: "Mr. Habtamu Derajaw", role: "Research & Clinical Training Desk Head", phone: "", image: "/assets/research/mr_habtamu_derajaw_headshot_1775135205786.png" },
    { id: 'azmera', name: "Mrs. Azmera Hadush", role: "CPD Desk Head", phone: "+251 91 216 0130", image: "" },
    { id: 'zebiba', name: "Mrs. Zebiba Nassir", role: "CPD Officer", phone: "+251 93 208 2657", image: "" },
    { id: 'mensur', name: "Mr. Mensur Nesru", role: "Research Officer", phone: "", image: "/assets/research/mr_mensur_nesru_headshot_1775135244113.png" }
  ];

  if (!setting) {
      await prisma.siteSetting.create({
          data: {
              key: staffKey,
              value: JSON.stringify(exactStaff),
              label: 'Institutional Staff Matrix',
              group: 'staff'
          }
      });
      console.log('Created DB setting staff_directory');
  } else {
      let existing = [];
      try {
          existing = JSON.parse(setting.value);
      } catch(e) {}
      
      let toSave = [...existing];
      if (!Array.isArray(toSave)) toSave = [];

      let modified = false;
      for (const p of exactStaff) {
          const found = toSave.find(s => s.id === p.id);
          if (!found) {
              toSave.push(p);
              modified = true;
          } else {
              if (found.name !== p.name || found.role !== p.role) {
                  found.name = p.name;
                  found.role = p.role;
                  modified = true;
              }
          }
      }

      if (modified) {
          await prisma.siteSetting.update({
              where: { key: staffKey },
              data: { value: JSON.stringify(toSave) }
          });
          console.log('Updated DB setting staff_directory');
      } else {
          console.log('DB already had all required staff.');
      }
  }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(() => prisma.$disconnect());
