/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     summary: Fetch all users details
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Suraj
 *                   email:
 *                     type: string
 *                     example: suraj@example.com
 *                   role:
 *                     type: string
 *                     example: user
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a specific user (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to be deleted
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: The specific user deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Failed to delete user
 */

