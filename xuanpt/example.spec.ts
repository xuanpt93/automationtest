import { test, expect } from '@playwright/test';
import { log } from 'console';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  console.log("123");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();  //check link get started co thuc hien duoc hanh dong click khong
  await page.getByRole('link', {name: 'Codegen'} ).check.length;

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});



//loai bo nhung function khong can test
test.skip('skip this test', async ({ page }) => {
  // This test is not run
});

//chúng ta có thể nhóm nhiều fuctions test lại thành 1 nhóm
//vd: test 1 chức năng đăng nhập 
test.describe('function login', () => {
  test('verify user', async ({ page }) => {
    //check tài khoản mật khẩu 
  });

  test('verify username', async ({ page }) => {
    // check tên đăng nhập có đúng định dạng
  });

  test('verify pasword', async ({ page }) => {
    // check mật khẩu có đúng định dạng
  });
  //...... còn nhiều function thì thêm vào
});

//vidu ve test login
// page.goto(url): Điều hướng đến URL.
// page.fill(selector, value): Nhập giá trị vào trường nhập liệu.
// page.click(selector): Nhấp vào nút hoặc liên kết.
// page.waitForLoadState(state): Chờ trạng thái tải hoàn tất.
// page.locator(selector): Lấy phần tử dựa trên bộ chọn.

test('xuanpt', async({page}) =>{
  // 1. Điều hướng (Navigation)
  await page.goto('https://example.com/login');  //điều hướng tới 1 url
  await page.reload(); //tải lại trang hiện tại
  await page.goBack(); //tải lai trang trước đó
  await page.goForward(); // chuyển đến trang tiếp theo
  //2. Thao tác với các phần tử
  await expect(page.locator('h1')).toContainText('Example Domai'); //kiểm tra xem đoạn text có đúng không
  await page.getByText('Example').click(); //tìm và click vào phần tử abccc
  await page.getByRole('link', { name: 'IANA' }).click(); //tìm và click vào link IANA
  await page.getByRole('heading', { name: 'IANA-managed Reserved Domains' }).click();

  await expect(page.getByLabel('tìm kiếm')).toBeEmpty(); //Dùng để kiểm tra xem phần tử được chọn có rỗng hay không
});



test.describe('Login', () => {
  test('login success', async ({ page }) => {
    // Định nghĩa URL và thông tin đăng nhập
    const baseUrl = 'https://example.com';
    const validEmail = 'testuser@gmail.com';
    const validPassword = 'password123';

    // Điều hướng đến trang đăng nhập
    // await page.goto(`${baseUrl}/login`);
    await page.goto(`${baseUrl}/login`);

    // Tìm và nhập email
    await page.fill('input[name="email"]', validEmail);


    // Tìm và nhập mật khẩu
    await page.fill('input[name="password"]', validPassword);

    // Nhấp vào nút đăng nhập
    await page.click('button[type="submit"]');

    // Chờ trang tải và kiểm tra nếu người dùng đăng nhập thành công
    await page.waitForLoadState('networkidle');

    // Kiểm tra xem có chuyển hướng đến trang dashboard hoặc hiển thị thông báo thành công
    const successMessage = await page.locator('.success-message').textContent();
    expect(successMessage).toContain('Welcome'); // Thay thế bằng nội dung mong muốn

    // Kiểm tra URL sau khi đăng nhập thành công
    expect(page.url()).toBe(`${baseUrl}/dashboard`); // Thay thế đường dẫn mong đợi
  });

  test('login error', async ({ page }) => {
    // Định nghĩa URL và thông tin đăng nhập sai
    const baseUrl = 'https://example.com';
    const invalidEmail = 'invaliduser@example.com';
    const invalidPassword = 'wrongpassword';

    // Điều hướng đến trang đăng nhập
    await page.goto(`https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&hl=vi&ifkv=AeZLP9-3ThwcMDqbDaFxL5Iii4oYRsLRzUIRFoX1qQobbuVz4VANEoh72H9jkm_Ek2iWjH5J13JZkA&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S252074093%3A1736179571976990&ddm=1`);

    // Tìm và nhập email
    await page.fill('input[name="email"]', invalidEmail);

    // Tìm và nhập mật khẩu
    await page.fill('input[name="password"]', invalidPassword);

    // Nhấp vào nút đăng nhập
    await page.click('button[type="submit"]');

    // Kiểm tra thông báo lỗi hiển thị
    const errorMessage = await page.locator('.error-message').textContent();
    expect(errorMessage).toContain('Invalid email or password'); // Thay thế bằng nội dung mong muốn
  });
});
