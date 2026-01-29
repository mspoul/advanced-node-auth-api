/**
 * @openapi
 * /api/user/dashboard:
 *  get:
 *      summary: fetched succesfully
 *      tags:
 *          - Auth
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Dashboard details fetched successfully 
 *          401:
 *              description: Unauthorized - token missing or invalid
 *          403:
 *              description: Forbidden - access denied
 *          500:
 *              description: Internal server error
 * 
 *          
 */
    

