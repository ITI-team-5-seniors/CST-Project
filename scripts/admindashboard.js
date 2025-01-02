$(function() {
    function displayUsers() {
      const users = JSON.parse(localStorage.getItem('users')) || [];

      const tableBody = $('table tbody');
      tableBody.empty();
            if (users.length > 0) {
        users.forEach((user, index) => {
          const row = `
            <tr data-index="${index}">
              <td>#${index + 1}</td>
              <td>${user.username}</td>
              <td>
                <button class="btn btn-sm btn-primary"><i class="fa-solid fa-user-plus"></i></button>
                <button class="btn btn-sm btn-danger delete-user"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `;
          tableBody.append(row);
        });
      } else {
        const row = `
          <tr>
            <td colspan="3" class="text-center">No users found</td>
          </tr>
        `;
        tableBody.append(row);
      }
    }

    $(document).on('click', '.delete-user', function() {
      const row = $(this).closest('tr');  
      const index = row.data('index');    

      const users = JSON.parse(localStorage.getItem('users')) || [];
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            displayUsers();
         
    });

    displayUsers();

  });