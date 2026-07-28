 const menuBtn = document.getElementById('menuBtn');
        const navLinks = document.getElementById('navLinks');

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        function togglePriceField(value) {
            const priceGroup = document.getElementById('priceGroup');
            if (value === 'sale') {
                priceGroup.style.display = 'block';
            } else {
                priceGroup.style.display = 'none';
            }
        }

        function filterCategory(category, e) {
            const buttons = document.querySelectorAll('.tag-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            e.target.classList.add('active');

            const cards = document.querySelectorAll('.book-card');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function searchBooks() {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const cards = document.querySelectorAll('.book-card');

            cards.forEach(card => {
                const title = card.querySelector('.book-title').textContent.toLowerCase();
                const author = card.querySelector('.book-author').textContent.toLowerCase();

                if (title.includes(input) || author.includes(input)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        document.getElementById('addBookForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const type = document.getElementById('type').value;
            const price = document.getElementById('price').value;

            let badgeText = "كتاب";
            let badgeClass = "badge-book";
            let priceText = "مجاني (PDF)";
            let iconClass = "fa-book-medical";

            if(type === 'research') {
                badgeText = "بحث علمي";
                badgeClass = "badge-research";
                iconClass = "fa-file-lines";
            } else if(type === 'sale') {
                badgeText = "للبيع";
                badgeClass = "badge-sale";
                priceText = price + " جنيه";
                iconClass = "fa-shop";
            } else if(type === 'donate') {
                badgeText = "تبرع ورقي";
                badgeClass = "badge-donate";
                priceText = "مجاني (ورقي)";
                iconClass = "fa-hand-holding-heart";
            }

            const newCard = document.createElement('div');
            newCard.className = 'book-card';
            newCard.setAttribute('data-category', type);
            newCard.innerHTML = `
                <div class="book-img">
                    <i class="fa-solid ${iconClass}"></i>
                    <span class="book-badge ${badgeClass}">${badgeText}</span>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${title}</h3>
                    <p class="book-author">المضيف: ${author}</p>
                    <div class="book-footer">
                        <span class="book-price">${priceText}</span>
                        <a href="#" class="btn-download"><i class="fa-solid fa-eye"></i> التفاصيل</a>
                    </div>
                </div>
            `;

            document.getElementById('booksGrid').prepend(newCard);

            alert('تم نشر الكتاب/البحث بنجاح ومضاف للشبكة الآن!');
            this.reset();
            togglePriceField('book');
        });