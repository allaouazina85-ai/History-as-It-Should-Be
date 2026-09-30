document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.scatter-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardTitle = card.querySelector('.card-title').innerText;
            console.log(`تم النقر على قسم: ${cardTitle}`);
            // جاهز لفتح النوافذ المنبثقة (Modals) أو التوجيه للصفحات الفرعية
        });
    });
});