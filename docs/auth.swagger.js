/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Suraj
 *               email:
 *                 type: string
 *                 example: suraj@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: suraj@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Suraj
 *                 email:
 *                   type: string
 *                   example: suraj@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *       401:
 *         description: Unauthorized
 */


/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send password reset link
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: suraj@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       404:
 *         description: User not found
 */


/**
 * @openapi
 * /api/auth/reset-password/{token}:
 *   put:
 *     summary: Reset password using reset token
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid or expired token
 */


/**
 * @openapi
 * /api/auth/update-password:
 *  patch:
 *      summary: Updating Password
 *      tags:
 *        - Auth
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - currPassword
 *                  - newPassword
 *                properties:
 *                  currPassword:
 *                    type: string
 *                    example: OldPassword
 *                  newPassword:
 *                    type: string
 *                    example: newPassword
 *      responses:
 *       200:
 *         description: Password Updated Successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server Error     
 */


